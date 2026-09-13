import pandas as pd


def prepare_features(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    df["Profit"] = df["Revenue"] - df["Expense"]

    df["Profit_Margin"] = (
        (df["Profit"] / df["Revenue"].replace(0, pd.NA)) * 100
    )

    df["Revenue_per_Unit"] = (
        df["Revenue"] / df["Quantity"].replace(0, pd.NA)
    )

    df["Expense_per_Unit"] = (
        df["Expense"] / df["Quantity"].replace(0, pd.NA)
    )

    df = df.replace(
        [float("inf"), float("-inf")],
        pd.NA
    )

    df = df.fillna(0)

    return df