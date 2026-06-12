"""Streamlit dashboard for EDA and live churn prediction."""

from __future__ import annotations

import sys
from pathlib import Path

import pandas as pd
import plotly.express as px
import streamlit as st


PROJECT_ROOT = Path(__file__).resolve().parent
SRC_DIR = PROJECT_ROOT / "src"
if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))

from predict import predict_churn  # noqa: E402
from preprocess import DATA_PATH, load_dataset, normalize_column_names  # noqa: E402
from train import MODEL_PATH  # noqa: E402


st.set_page_config(page_title="Customer Churn Prediction", page_icon="chart_with_downwards_trend", layout="wide")


@st.cache_data(show_spinner=False)
def cached_dataset() -> pd.DataFrame:
    return load_dataset(DATA_PATH)


def sample_fallback_data() -> pd.DataFrame:
    return normalize_column_names(
        pd.DataFrame(
            [
                {
                    "Churn": 1,
                    "Tenure": 2,
                    "PreferredLoginDevice": "Mobile Phone",
                    "CityTier": 3,
                    "WarehouseToHome": 9,
                    "PreferredPaymentMode": "Debit Card",
                    "Gender": "Female",
                    "HourSpendOnApp": 3,
                    "NumberOfDeviceRegistered": 4,
                    "PreferredOrderCat": "Mobile Phone",
                    "SatisfactionScore": 2,
                    "MaritalStatus": "Single",
                    "NumberOfAddress": 3,
                    "Complain": 1,
                    "OrderAmountHikeFromLastYear": 16,
                    "CouponUsed": 1,
                    "OrderCount": 2,
                    "DaySinceLastOrder": 7,
                    "CashbackAmount": 148,
                },
                {
                    "Churn": 0,
                    "Tenure": 18,
                    "PreferredLoginDevice": "Computer",
                    "CityTier": 1,
                    "WarehouseToHome": 5,
                    "PreferredPaymentMode": "Credit Card",
                    "Gender": "Male",
                    "HourSpendOnApp": 2,
                    "NumberOfDeviceRegistered": 3,
                    "PreferredOrderCat": "Laptop & Accessory",
                    "SatisfactionScore": 4,
                    "MaritalStatus": "Married",
                    "NumberOfAddress": 2,
                    "Complain": 0,
                    "OrderAmountHikeFromLastYear": 12,
                    "CouponUsed": 2,
                    "OrderCount": 7,
                    "DaySinceLastOrder": 3,
                    "CashbackAmount": 218,
                },
            ]
        )
    )


def load_dashboard_data() -> pd.DataFrame:
    try:
        return cached_dataset()
    except Exception:
        return sample_fallback_data()


def categorical_options(dataframe: pd.DataFrame, column: str, defaults: list[str]) -> list[str]:
    if column in dataframe.columns:
        values = sorted(str(value) for value in dataframe[column].dropna().unique())
        return values or defaults
    return defaults


data = load_dashboard_data()

st.title("Customer Behavior Prediction")
st.caption("E-commerce churn analytics and live XGBoost prediction")

metric_columns = st.columns(4)
metric_columns[0].metric("Customers", f"{len(data):,}")
metric_columns[1].metric("Churn Rate", f"{data['Churn'].mean() * 100:.1f}%" if "Churn" in data else "N/A")
metric_columns[2].metric("Model", "XGBoost")
metric_columns[3].metric("API Ready", "Yes" if MODEL_PATH.exists() else "Train model")

eda_tab, prediction_tab, batch_tab = st.tabs(["EDA", "Live Prediction", "Batch Scoring"])

with eda_tab:
    left, right = st.columns(2)
    if "Churn" in data.columns:
        churn_counts = data["Churn"].map({0: "Retained", 1: "Churn"}).value_counts().reset_index()
        churn_counts.columns = ["Outcome", "Customers"]
        left.plotly_chart(px.bar(churn_counts, x="Outcome", y="Customers", color="Outcome"), use_container_width=True)

    numeric_columns = data.select_dtypes(include="number").columns.drop("Churn", errors="ignore").tolist()
    selected_numeric = right.selectbox("Numeric feature", numeric_columns, index=0 if numeric_columns else None)
    if selected_numeric:
        right.plotly_chart(
            px.histogram(data, x=selected_numeric, color=data["Churn"].map({0: "Retained", 1: "Churn"}) if "Churn" in data else None),
            use_container_width=True,
        )

    category_columns = data.select_dtypes(exclude="number").columns.tolist()
    selected_category = st.selectbox("Categorical breakdown", category_columns, index=0 if category_columns else None)
    if selected_category and "Churn" in data.columns:
        grouped = (
            data.groupby(selected_category, dropna=False)["Churn"]
            .mean()
            .mul(100)
            .reset_index(name="Churn Rate")
            .sort_values("Churn Rate", ascending=False)
        )
        st.plotly_chart(px.bar(grouped, x=selected_category, y="Churn Rate"), use_container_width=True)

    st.dataframe(data.head(100), use_container_width=True, hide_index=True)

with prediction_tab:
    st.subheader("Live Customer Prediction")
    col1, col2, col3 = st.columns(3)

    with col1:
        tenure = st.number_input("Tenure", min_value=0.0, max_value=100.0, value=8.0)
        city_tier = st.selectbox("City Tier", [1, 2, 3], index=0)
        warehouse_to_home = st.number_input("Warehouse To Home", min_value=0.0, max_value=200.0, value=8.0)
        hour_spend_on_app = st.number_input("Hours On App", min_value=0.0, max_value=24.0, value=3.0)
        devices = st.number_input("Registered Devices", min_value=1, max_value=10, value=3)
        addresses = st.number_input("Number Of Addresses", min_value=1, max_value=25, value=3)

    with col2:
        login_device = st.selectbox(
            "Preferred Login Device",
            categorical_options(data, "PreferredLoginDevice", ["Mobile Phone", "Computer", "Phone"]),
        )
        payment_mode = st.selectbox(
            "Preferred Payment Mode",
            categorical_options(data, "PreferredPaymentMode", ["Debit Card", "Credit Card", "UPI", "Cash on Delivery"]),
        )
        gender = st.selectbox("Gender", categorical_options(data, "Gender", ["Female", "Male"]))
        order_category = st.selectbox(
            "Preferred Order Category",
            categorical_options(data, "PreferredOrderCat", ["Mobile Phone", "Laptop & Accessory", "Fashion", "Grocery"]),
        )
        marital_status = st.selectbox("Marital Status", categorical_options(data, "MaritalStatus", ["Single", "Married", "Divorced"]))

    with col3:
        satisfaction = st.slider("Satisfaction Score", 1, 5, 3)
        complain = st.radio("Complain", [0, 1], horizontal=True)
        order_hike = st.number_input("Order Amount Hike From Last Year", min_value=0.0, max_value=100.0, value=14.0)
        coupon_used = st.number_input("Coupons Used", min_value=0.0, max_value=50.0, value=1.0)
        order_count = st.number_input("Order Count", min_value=0.0, max_value=100.0, value=3.0)
        days_since_last_order = st.number_input("Days Since Last Order", min_value=0.0, max_value=365.0, value=5.0)
        cashback = st.number_input("Cashback Amount", min_value=0.0, max_value=1000.0, value=160.0)

    customer_payload = {
        "Tenure": tenure,
        "PreferredLoginDevice": login_device,
        "CityTier": city_tier,
        "WarehouseToHome": warehouse_to_home,
        "PreferredPaymentMode": payment_mode,
        "Gender": gender,
        "HourSpendOnApp": hour_spend_on_app,
        "NumberOfDeviceRegistered": devices,
        "PreferredOrderCat": order_category,
        "SatisfactionScore": satisfaction,
        "MaritalStatus": marital_status,
        "NumberOfAddress": addresses,
        "Complain": complain,
        "OrderAmountHikeFromLastYear": order_hike,
        "CouponUsed": coupon_used,
        "OrderCount": order_count,
        "DaySinceLastOrder": days_since_last_order,
        "CashbackAmount": cashback,
    }

    if st.button("Predict Churn", type="primary"):
        try:
            result = predict_churn(customer_payload)
            st.metric("Prediction", result["prediction_label"], f"{result['churn_probability'] * 100:.1f}% churn probability")
            st.progress(result["churn_probability"])
        except FileNotFoundError as exc:
            st.error(str(exc))

with batch_tab:
    uploaded_file = st.file_uploader("Upload customer CSV for scoring", type=["csv"])
    if uploaded_file:
        batch = pd.read_csv(uploaded_file)
        try:
            predictions = predict_churn(batch)["predictions"]
            output = batch.copy()
            output["churn_prediction"] = [row["prediction"] for row in predictions]
            output["churn_probability"] = [row["churn_probability"] for row in predictions]
            st.dataframe(output, use_container_width=True, hide_index=True)
            st.download_button("Download scored CSV", output.to_csv(index=False), "churn_predictions.csv", "text/csv")
        except FileNotFoundError as exc:
            st.error(str(exc))
