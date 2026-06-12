"""Preprocessing utilities for the Kaggle E-Commerce Customer Churn dataset."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

import joblib
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = PROJECT_ROOT / "data" / "ecommerce_churn.csv"
MODELS_DIR = PROJECT_ROOT / "models"
PREPROCESSOR_PATH = MODELS_DIR / "preprocessor.pkl"
FEATURES_PATH = MODELS_DIR / "feature_columns.pkl"

TARGET_COLUMN = "Churn"
ID_COLUMNS = {"CustomerID", "customer_id", "CustomerId", "customerID"}


@dataclass(frozen=True)
class DatasetBundle:
    """Container for split-independent model inputs."""

    features: pd.DataFrame
    target: pd.Series


def normalize_column_names(dataframe: pd.DataFrame) -> pd.DataFrame:
    """Normalize common Kaggle spelling variants while preserving business names."""

    rename_map = {
        "PreferredLoginDevice": "PreferredLoginDevice",
        "PreferedOrderCat": "PreferredOrderCat",
        "PreferredOrderCat": "PreferredOrderCat",
        "OrderAmountHikeFromlastYear": "OrderAmountHikeFromLastYear",
        "OrderAmountHikeFromLastYear": "OrderAmountHikeFromLastYear",
    }
    return dataframe.rename(columns={col: rename_map.get(col, col) for col in dataframe.columns})


def load_dataset(path: str | Path = DATA_PATH) -> pd.DataFrame:
    """Load the churn dataset from CSV and apply light schema normalization."""

    csv_path = Path(path)
    if not csv_path.exists():
        raise FileNotFoundError(
            f"Dataset not found at {csv_path}. Download the Kaggle E-Commerce Customer "
            "Churn dataset and save it as data/ecommerce_churn.csv."
        )

    dataframe = pd.read_csv(csv_path)
    dataframe = normalize_column_names(dataframe)
    if TARGET_COLUMN not in dataframe.columns:
        raise ValueError(f"Expected target column '{TARGET_COLUMN}' in {csv_path}.")
    return dataframe


def split_features_target(dataframe: pd.DataFrame) -> DatasetBundle:
    """Separate features and target, dropping customer identifier columns."""

    dataframe = normalize_column_names(dataframe.copy())
    drop_columns = [column for column in dataframe.columns if column in ID_COLUMNS]
    features = dataframe.drop(columns=[TARGET_COLUMN, *drop_columns], errors="ignore")
    target = dataframe[TARGET_COLUMN].astype(int)
    return DatasetBundle(features=features, target=target)


def get_feature_groups(features: pd.DataFrame) -> tuple[list[str], list[str]]:
    """Return numeric and categorical feature names."""

    numeric_features = features.select_dtypes(include=["number", "bool"]).columns.tolist()
    categorical_features = [column for column in features.columns if column not in numeric_features]
    return numeric_features, categorical_features


def build_preprocessor(features: pd.DataFrame) -> ColumnTransformer:
    """Build a null-safe, encoded, scaled preprocessing transformer."""

    numeric_features, categorical_features = get_feature_groups(features)

    numeric_pipeline = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler()),
        ]
    )

    categorical_pipeline = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="most_frequent")),
            ("encoder", OneHotEncoder(handle_unknown="ignore", sparse_output=False)),
        ]
    )

    return ColumnTransformer(
        transformers=[
            ("numeric", numeric_pipeline, numeric_features),
            ("categorical", categorical_pipeline, categorical_features),
        ],
        remainder="drop",
        verbose_feature_names_out=False,
    )


def save_preprocessor(preprocessor: ColumnTransformer, feature_columns: Iterable[str]) -> None:
    """Persist the fitted preprocessor and expected raw input feature order."""

    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(preprocessor, PREPROCESSOR_PATH)
    joblib.dump(list(feature_columns), FEATURES_PATH)


def load_preprocessor() -> tuple[ColumnTransformer, list[str]]:
    """Load the fitted preprocessor and expected raw feature columns."""

    if not PREPROCESSOR_PATH.exists() or not FEATURES_PATH.exists():
        raise FileNotFoundError("Preprocessor artifacts are missing. Run `python src/train.py` first.")
    return joblib.load(PREPROCESSOR_PATH), joblib.load(FEATURES_PATH)


def prepare_inference_frame(payload: dict | pd.DataFrame, expected_columns: list[str]) -> pd.DataFrame:
    """Convert API/dashboard payloads to a single-row DataFrame with stable columns."""

    if isinstance(payload, pd.DataFrame):
        dataframe = payload.copy()
    else:
        dataframe = pd.DataFrame([payload])

    dataframe = normalize_column_names(dataframe)
    dataframe = dataframe.drop(columns=[TARGET_COLUMN, *ID_COLUMNS], errors="ignore")

    for column in expected_columns:
        if column not in dataframe.columns:
            dataframe[column] = pd.NA

    return dataframe[expected_columns]


def main() -> None:
    """Fit and persist the preprocessor independently for inspection/debugging."""

    dataframe = load_dataset()
    bundle = split_features_target(dataframe)
    preprocessor = build_preprocessor(bundle.features)
    preprocessor.fit(bundle.features, bundle.target)
    save_preprocessor(preprocessor, bundle.features.columns)
    print(f"Saved preprocessor to {PREPROCESSOR_PATH}")


if __name__ == "__main__":
    main()
