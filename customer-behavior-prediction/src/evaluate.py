"""Evaluate the trained churn model and generate diagnostic plots."""

from __future__ import annotations

import json
from pathlib import Path

import joblib
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from sklearn.metrics import accuracy_score, confusion_matrix, f1_score, precision_score, recall_score
from sklearn.model_selection import train_test_split

from preprocess import DATA_PATH, load_dataset, split_features_target
from train import MODEL_PATH, RANDOM_STATE


PROJECT_ROOT = Path(__file__).resolve().parents[1]
REPORTS_DIR = PROJECT_ROOT / "reports"
FIGURES_DIR = REPORTS_DIR / "figures"
EVALUATION_PATH = REPORTS_DIR / "evaluation_metrics.json"


def _feature_names(model_pipeline) -> list[str]:
    preprocessor = model_pipeline.named_steps["preprocessor"]
    try:
        return preprocessor.get_feature_names_out().tolist()
    except Exception:
        return [f"feature_{index}" for index in range(model_pipeline.named_steps["model"].n_features_in_)]


def save_confusion_matrix(y_true: pd.Series, y_pred: pd.Series) -> Path:
    """Save a confusion matrix heatmap."""

    FIGURES_DIR.mkdir(parents=True, exist_ok=True)
    matrix = confusion_matrix(y_true, y_pred)
    plt.figure(figsize=(6, 5))
    sns.heatmap(matrix, annot=True, fmt="d", cmap="Blues", cbar=False)
    plt.title("Confusion Matrix")
    plt.xlabel("Predicted")
    plt.ylabel("Actual")
    output_path = FIGURES_DIR / "confusion_matrix.png"
    plt.tight_layout()
    plt.savefig(output_path, dpi=180)
    plt.close()
    return output_path


def save_feature_importance(model_pipeline, top_n: int = 20) -> Path:
    """Save a top-N XGBoost feature importance chart."""

    model = model_pipeline.named_steps["model"]
    names = _feature_names(model_pipeline)
    importances = pd.Series(model.feature_importances_, index=names).sort_values(ascending=False).head(top_n)

    FIGURES_DIR.mkdir(parents=True, exist_ok=True)
    plt.figure(figsize=(9, 7))
    sns.barplot(x=importances.values, y=importances.index, color="#277da1")
    plt.title(f"Top {top_n} Feature Importances")
    plt.xlabel("Importance")
    plt.ylabel("Feature")
    output_path = FIGURES_DIR / "feature_importance.png"
    plt.tight_layout()
    plt.savefig(output_path, dpi=180)
    plt.close()
    return output_path


def evaluate(data_path: str | Path = DATA_PATH) -> dict[str, float | str]:
    """Evaluate saved model on a deterministic holdout split."""

    if not MODEL_PATH.exists():
        raise FileNotFoundError(f"Model not found at {MODEL_PATH}. Run `python src/train.py` first.")

    dataframe = load_dataset(data_path)
    bundle = split_features_target(dataframe)
    _, x_test, _, y_test = train_test_split(
        bundle.features,
        bundle.target,
        test_size=0.2,
        stratify=bundle.target,
        random_state=RANDOM_STATE,
    )

    model_pipeline = joblib.load(MODEL_PATH)
    y_pred = model_pipeline.predict(x_test)

    metrics = {
        "accuracy": float(accuracy_score(y_test, y_pred)),
        "precision": float(precision_score(y_test, y_pred, zero_division=0)),
        "recall": float(recall_score(y_test, y_pred, zero_division=0)),
        "f1": float(f1_score(y_test, y_pred, zero_division=0)),
        "confusion_matrix_path": str(save_confusion_matrix(y_test, y_pred)),
        "feature_importance_path": str(save_feature_importance(model_pipeline)),
    }

    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    with EVALUATION_PATH.open("w", encoding="utf-8") as file:
        json.dump(metrics, file, indent=2)

    print(json.dumps(metrics, indent=2))
    return metrics


if __name__ == "__main__":
    evaluate()
