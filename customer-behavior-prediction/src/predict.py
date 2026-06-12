"""Prediction helpers for batch, API, and dashboard use."""

from __future__ import annotations

from pathlib import Path
from typing import Any

import joblib
import pandas as pd

from preprocess import FEATURES_PATH, normalize_column_names, prepare_inference_frame
from train import MODEL_PATH


def load_model(model_path: str | Path = MODEL_PATH):
    """Load the persisted XGBoost pipeline."""

    path = Path(model_path)
    if not path.exists():
        raise FileNotFoundError(f"Model artifact not found at {path}. Run `python src/train.py` first.")
    return joblib.load(path)


def load_expected_columns() -> list[str]:
    """Load raw feature columns expected by the trained model."""

    if FEATURES_PATH.exists():
        return joblib.load(FEATURES_PATH)
    model = load_model()
    preprocessor = model.named_steps["preprocessor"]
    return list(preprocessor.feature_names_in_)


def predict_churn(customer_data: dict[str, Any] | pd.DataFrame) -> dict[str, Any]:
    """Predict churn class and probability for one or more customers."""

    model = load_model()
    expected_columns = load_expected_columns()
    inference_frame = prepare_inference_frame(customer_data, expected_columns)

    probabilities = model.predict_proba(inference_frame)[:, 1]
    predictions = model.predict(inference_frame)

    results = [
        {
            "prediction": int(prediction),
            "prediction_label": "Churn" if int(prediction) == 1 else "Retained",
            "churn_probability": round(float(probability), 6),
        }
        for prediction, probability in zip(predictions, probabilities)
    ]

    if isinstance(customer_data, pd.DataFrame):
        return {"predictions": results}
    return results[0]


def predict_from_csv(input_path: str | Path, output_path: str | Path) -> Path:
    """Score a CSV file and write predictions to a new CSV."""

    dataframe = normalize_column_names(pd.read_csv(input_path))
    scored = dataframe.copy()
    predictions = predict_churn(dataframe)["predictions"]
    scored["churn_prediction"] = [row["prediction"] for row in predictions]
    scored["churn_probability"] = [row["churn_probability"] for row in predictions]
    output = Path(output_path)
    output.parent.mkdir(parents=True, exist_ok=True)
    scored.to_csv(output, index=False)
    return output


if __name__ == "__main__":
    sample_customer = {
        "Tenure": 4,
        "PreferredLoginDevice": "Mobile Phone",
        "CityTier": 3,
        "WarehouseToHome": 8,
        "PreferredPaymentMode": "Debit Card",
        "Gender": "Female",
        "HourSpendOnApp": 3,
        "NumberOfDeviceRegistered": 4,
        "PreferredOrderCat": "Mobile Phone",
        "SatisfactionScore": 2,
        "MaritalStatus": "Single",
        "NumberOfAddress": 3,
        "Complain": 1,
        "OrderAmountHikeFromLastYear": 15,
        "CouponUsed": 1,
        "OrderCount": 2,
        "DaySinceLastOrder": 6,
        "CashbackAmount": 150,
    }
    print(predict_churn(sample_customer))
