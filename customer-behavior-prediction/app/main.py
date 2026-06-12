"""FastAPI service for real-time customer churn prediction."""

from __future__ import annotations

import sys
from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = PROJECT_ROOT / "src"
if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))

from predict import predict_churn  # noqa: E402
from train import MODEL_PATH  # noqa: E402


class CustomerData(BaseModel):
    """Flexible schema matching the Kaggle churn columns."""

    model_config = ConfigDict(extra="allow", populate_by_name=True)

    Tenure: float | None = Field(default=None)
    PreferredLoginDevice: str | None = Field(default=None)
    CityTier: int | None = Field(default=None)
    WarehouseToHome: float | None = Field(default=None)
    PreferredPaymentMode: str | None = Field(default=None)
    Gender: str | None = Field(default=None)
    HourSpendOnApp: float | None = Field(default=None)
    NumberOfDeviceRegistered: int | None = Field(default=None)
    PreferredOrderCat: str | None = Field(default=None)
    SatisfactionScore: int | None = Field(default=None)
    MaritalStatus: str | None = Field(default=None)
    NumberOfAddress: int | None = Field(default=None)
    Complain: int | None = Field(default=None)
    OrderAmountHikeFromLastYear: float | None = Field(default=None)
    CouponUsed: float | None = Field(default=None)
    OrderCount: float | None = Field(default=None)
    DaySinceLastOrder: float | None = Field(default=None)
    CashbackAmount: float | None = Field(default=None)


class PredictionResponse(BaseModel):
    prediction: int
    prediction_label: str
    churn_probability: float


app = FastAPI(
    title="Customer Behavior Prediction API",
    description="Predict e-commerce customer churn using a trained XGBoost model.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, Any]:
    """Return service health and model availability."""

    return {"status": "ok", "model_available": MODEL_PATH.exists(), "model_path": str(MODEL_PATH)}


@app.post("/predict", response_model=PredictionResponse)
def predict(customer: CustomerData) -> dict[str, Any]:
    """Predict churn from a JSON customer record."""

    try:
        payload = customer.model_dump(exclude_none=True)
        if not payload:
            raise HTTPException(status_code=422, detail="Request body must include customer feature values.")
        return predict_churn(payload)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
