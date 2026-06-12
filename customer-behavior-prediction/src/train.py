"""Train churn prediction models and persist the best XGBoost pipeline."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import f1_score
from sklearn.model_selection import RandomizedSearchCV, StratifiedKFold, train_test_split
from sklearn.pipeline import Pipeline
from xgboost import XGBClassifier

from preprocess import (
    DATA_PATH,
    MODELS_DIR,
    build_preprocessor,
    load_dataset,
    save_preprocessor,
    split_features_target,
)


MODEL_PATH = MODELS_DIR / "xgboost_model.pkl"
METRICS_PATH = MODELS_DIR / "model_results.json"
RANDOM_STATE = 42


def _positive_class_weight(y_train: pd.Series) -> float:
    negative = int((y_train == 0).sum())
    positive = int((y_train == 1).sum())
    return max(1.0, negative / max(positive, 1))


def build_candidate_models(y_train: pd.Series) -> dict[str, tuple[Pipeline, dict[str, list[Any]]]]:
    """Create baseline and tuned candidate model search spaces."""

    scale_pos_weight = _positive_class_weight(y_train)

    return {
        "logistic_regression": (
            Pipeline(
                steps=[
                    ("model", LogisticRegression(max_iter=2000, class_weight="balanced", random_state=RANDOM_STATE)),
                ]
            ),
            {
                "model__C": [0.01, 0.1, 1.0, 3.0, 10.0],
                "model__solver": ["lbfgs", "liblinear"],
            },
        ),
        "random_forest": (
            Pipeline(
                steps=[
                    (
                        "model",
                        RandomForestClassifier(
                            class_weight="balanced_subsample",
                            n_jobs=-1,
                            random_state=RANDOM_STATE,
                        ),
                    ),
                ]
            ),
            {
                "model__n_estimators": [250, 400, 600],
                "model__max_depth": [None, 6, 10, 14],
                "model__min_samples_split": [2, 5, 10],
                "model__min_samples_leaf": [1, 2, 4],
                "model__max_features": ["sqrt", "log2"],
            },
        ),
        "xgboost": (
            Pipeline(
                steps=[
                    (
                        "model",
                        XGBClassifier(
                            objective="binary:logistic",
                            eval_metric="logloss",
                            tree_method="hist",
                            n_jobs=-1,
                            random_state=RANDOM_STATE,
                            scale_pos_weight=scale_pos_weight,
                        ),
                    ),
                ]
            ),
            {
                "model__n_estimators": [200, 350, 500, 700],
                "model__max_depth": [2, 3, 4, 5],
                "model__learning_rate": [0.02, 0.04, 0.06, 0.08, 0.1],
                "model__subsample": [0.75, 0.85, 1.0],
                "model__colsample_bytree": [0.75, 0.9, 1.0],
                "model__min_child_weight": [1, 3, 5],
                "model__reg_lambda": [0.5, 1.0, 2.0, 5.0],
            },
        ),
    }


def tune_model(name: str, pipeline: Pipeline, params: dict[str, list[Any]], x_train: np.ndarray, y_train: pd.Series) -> RandomizedSearchCV:
    """Tune a model using stratified cross-validation optimized for F1."""

    min_class_count = int(y_train.value_counts().min())
    n_splits = max(2, min(5, min_class_count))
    cv = StratifiedKFold(n_splits=n_splits, shuffle=True, random_state=RANDOM_STATE)
    n_iter = min(30, int(np.prod([len(values) for values in params.values()])))
    search = RandomizedSearchCV(
        estimator=pipeline,
        param_distributions=params,
        n_iter=n_iter,
        scoring="f1",
        cv=cv,
        n_jobs=-1,
        random_state=RANDOM_STATE,
        verbose=1,
    )
    print(f"\nTraining {name} with {n_splits}-fold stratified CV...")
    search.fit(x_train, y_train)
    return search


def train(data_path: str | Path = DATA_PATH) -> dict[str, Any]:
    """Train Logistic Regression, Random Forest, and XGBoost; save XGBoost artifact."""

    dataframe = load_dataset(data_path)
    bundle = split_features_target(dataframe)

    x_train_raw, x_test_raw, y_train, y_test = train_test_split(
        bundle.features,
        bundle.target,
        test_size=0.2,
        stratify=bundle.target,
        random_state=RANDOM_STATE,
    )

    preprocessor = build_preprocessor(x_train_raw)
    x_train = preprocessor.fit_transform(x_train_raw, y_train)
    x_test = preprocessor.transform(x_test_raw)

    results: dict[str, Any] = {}
    searches: dict[str, RandomizedSearchCV] = {}
    for name, (candidate, params) in build_candidate_models(y_train).items():
        search = tune_model(name, candidate, params, x_train, y_train)
        searches[name] = search
        y_pred = search.best_estimator_.predict(x_test)
        results[name] = {
            "best_cv_f1": float(search.best_score_),
            "holdout_f1": float(f1_score(y_test, y_pred)),
            "best_params": search.best_params_,
        }

    xgb_model = searches["xgboost"].best_estimator_
    xgb_pipeline = Pipeline(steps=[("preprocessor", preprocessor), ("model", xgb_model.named_steps["model"])])
    xgb_pipeline.fit(x_train_raw, y_train)

    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(xgb_pipeline, MODEL_PATH)
    save_preprocessor(preprocessor, bundle.features.columns)

    results["selected_model"] = "xgboost"
    results["model_path"] = str(MODEL_PATH)
    results["feature_columns"] = bundle.features.columns.tolist()
    with METRICS_PATH.open("w", encoding="utf-8") as file:
        json.dump(results, file, indent=2)

    print("\nModel comparison:")
    print(json.dumps(results, indent=2))
    print(f"\nSaved trained XGBoost pipeline to {MODEL_PATH}")
    return results


if __name__ == "__main__":
    train()
