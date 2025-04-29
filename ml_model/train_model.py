# import pandas as pd
# import numpy as np
# from sklearn.model_selection import train_test_split
# from sklearn.linear_model import LinearRegression
# from sklearn.metrics import mean_absolute_error, mean_squared_error
# import joblib

# # 1. Load and preprocess the data
# def load_and_preprocess_data(file_path):
#     df = pd.read_csv(file_path)
#     df = df.dropna(subset=['Rent Price'])

#     # Outlier treatment
#     upper_limit = df['Rent Price'].quantile(0.95)
#     df = df[df['Rent Price'] <= upper_limit]

#     # Convert types
#     for col in ['Rent Price', 'BHK', 'Area']:
#         df[col] = pd.to_numeric(df[col], errors='coerce')

#     return df

# # 2. Feature engineering
# def engineer_features(df, is_training=True, feature_columns=None):
#     df = df.copy()
#     df['Price_per_SqFt'] = df['Rent Price'] / df['Area']
#     df['Price_per_SqFt'] = df['Price_per_SqFt'].fillna(df['Price_per_SqFt'].max() * 2)
#     df['BHK_Area_Interaction'] = df['BHK'] * df['Area']
#     df['BHK_PricePerSqFt_Interaction'] = df['BHK'] * df['Price_per_SqFt']

#     df['Log_Area'] = np.log1p(df['Area'])
#     df['Log_Rent_Price'] = np.log1p(df['Rent Price'])

#     df = pd.get_dummies(df, columns=['Location', 'Gym Available', 'Parking Available'], drop_first=True)

#     if is_training:
#         return df, df.columns.tolist()
#     else:
#         # Ensure all expected columns are present
#         for col in feature_columns:
#             if col not in df.columns:
#                 df[col] = 0
#         return df[feature_columns]

# # 3. Train model
# def train_model(df):
#     X = df.drop(['Log_Rent_Price', 'Rent Price', 'Address'], axis=1, errors='ignore')
#     y = df['Log_Rent_Price']
#     X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

#     model = LinearRegression()
#     model.fit(X_train, y_train)

#     return model, X_test, y_test, X.columns.tolist()

# # 4. Evaluate
# def evaluate_model(model, X_test, y_test):
#     y_pred = model.predict(X_test)
#     mae = mean_absolute_error(y_test, y_pred)
#     rmse = np.sqrt(mean_squared_error(y_test, y_pred))
#     print(f"MAE: {mae}")
#     print(f"RMSE: {rmse}")

# # Main training routine
# if __name__ == "__main__":
#     df = load_and_preprocess_data("Corrected_Rental_Dataset.csv")
#     df_engineered, all_columns = engineer_features(df, is_training=True)
#     model, X_test, y_test, model_columns = train_model(df_engineered)
#     evaluate_model(model, X_test, y_test)

#     # Save model and columns
#     joblib.dump(model, "rental_price_model.pkl")
#     joblib.dump(model_columns, "model_columns.pkl")
#     print("Model and metadata saved to root directory.")

# MAE: 0.44023744614519333
# RMSE: 0.6145386463957335

# ---------------^^^^^^^^^^^^^^^^-------------------

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error
import joblib
import os

# 1. Load and preprocess the data
def load_and_preprocess_data(file_path):
    df = pd.read_csv(file_path)
    df = df.dropna(subset=['Rent Price'])

    # Outlier treatment
    upper_limit = df['Rent Price'].quantile(0.95)
    df = df[df['Rent Price'] <= upper_limit]

    # Convert necessary columns
    for col in ['Rent Price', 'BHK', 'Area']:
        df[col] = pd.to_numeric(df[col], errors='coerce')

    return df

# 2. Feature engineering
def engineer_features(df, is_training=True, feature_columns=None):
    df = df.copy()

    df['Price_per_SqFt'] = df['Rent Price'] / df['Area']
    df['Price_per_SqFt'] = df['Price_per_SqFt'].fillna(df['Price_per_SqFt'].max() * 2)
    df['BHK_Area_Interaction'] = df['BHK'] * df['Area']
    df['BHK_PricePerSqFt_Interaction'] = df['BHK'] * df['Price_per_SqFt']

    df['Log_Area'] = np.log1p(df['Area'])
    df['Log_Rent_Price'] = np.log1p(df['Rent Price'])

    df = pd.get_dummies(df, columns=['Location', 'Gym Available', 'Parking Available'], drop_first=True)

    if is_training:
        return df, df.columns.tolist()
    else:
        # Add missing columns with 0s
        for col in feature_columns:
            if col not in df.columns:
                df[col] = 0
        # Drop any extra columns
        df = df[feature_columns]
        return df

# 3. Train model
def train_model(df):
    # Drop unnecessary columns
    X = df.drop(['Log_Rent_Price', 'Rent Price', 'Address'], axis=1, errors='ignore')
    y = df['Log_Rent_Price']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = LinearRegression()
    model.fit(X_train, y_train)

    return model, X_test, y_test, X.columns.tolist()

# 4. Evaluate model
def evaluate_model(model, X_test, y_test):
    y_pred_log = model.predict(X_test)
    y_test_real = np.expm1(y_test)
    y_pred_real = np.expm1(y_pred_log)

    mae = mean_absolute_error(y_test_real, y_pred_real)
    rmse = np.sqrt(mean_squared_error(y_test_real, y_pred_real))
    print(f"MAE: {mae}")
    print(f"RMSE: {rmse}")

# Run the training
if __name__ == "__main__":
    df = load_and_preprocess_data("Corrected_Rental_Dataset.csv")
    df_engineered, all_columns = engineer_features(df, is_training=True)
    model, X_test, y_test, model_columns = train_model(df_engineered)
    evaluate_model(model, X_test, y_test)

    # Save model and metadata
    joblib.dump(model, "rental_price_model.pkl")
    joblib.dump(model_columns, "model_columns.pkl")
    print("✅ Model and metadata saved in the root directory.")

# MAE: 29403.806144903447
# RMSE: 87412.49529499268




