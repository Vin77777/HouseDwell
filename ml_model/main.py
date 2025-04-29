# from fastapi import FastAPI
# from pydantic import BaseModel
# import joblib
# import numpy as np
# import pandas as pd

# app = FastAPI()

# # Load model and metadata
# model = joblib.load("rental_price_model.pkl")
# model_columns = joblib.load("model_columns.pkl")

# class RentalInput(BaseModel):
#     Location: str
#     BHK: int
#     Area: float
#     Gym_Available: bool
#     Parking_Available: bool

# print("api started")
# @app.get("/")
# def home():
#     return {"message": "Rental Price Prediction API"}

# @app.post("/predict")
# def predict(data: RentalInput):
#     try:
#         input_dict = {
#             "BHK": data.BHK,
#             "Area": data.Area,
#             "Rent Price": 1,  # dummy
#             "Location_" + data.Location: 1,
#             "Gym Available_Yes": int(data.Gym_Available),
#             "Parking Available_Yes": int(data.Parking_Available)
#         }

#         df_input = pd.DataFrame([input_dict])
#         df_input['Price_per_SqFt'] = df_input['Rent Price'] / df_input['Area']
#         df_input['BHK_Area_Interaction'] = df_input['BHK'] * df_input['Area']
#         df_input['BHK_PricePerSqFt_Interaction'] = df_input['BHK'] * df_input['Price_per_SqFt']
#         df_input['Log_Area'] = np.log1p(df_input['Area'])

#         # Add any missing columns with default value 0
#         for col in model_columns:
#             if col not in df_input.columns:
#                 df_input[col] = 0

#         df_input = df_input[model_columns]

#         log_pred = model.predict(df_input)[0]
#         final_price = np.expm1(log_pred)
#         print(f"predicted price :{final_price}")
        
#         return {"success": True, "price": round(final_price, 2)}
#     except Exception as e:
#         return {"success": False, "error": str(e)}


from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
import os

# Load trained model and column names
model = joblib.load("rental_price_model.pkl")
model_columns = joblib.load("model_columns.pkl")

# Initialize FastAPI
app = FastAPI()

# Input schema
class RentalInput(BaseModel):
    Location: str
    BHK: int
    Area: float
    Gym_Available: bool
    Parking_Available: bool

@app.get("/")
def home():
    return {"message": "Rental Price Prediction API is working!"}

# Prediction endpoint
@app.post("/predict")
def predict(data: RentalInput):
    try:
        # Create a single-row DataFrame for the input
        df = pd.DataFrame([{
            "Location": data.Location,
            "BHK": data.BHK,
            "Area": data.Area,
            "Gym Available": data.Gym_Available,
            "Parking Available": data.Parking_Available,
            "Rent Price": 0  # placeholder for feature engineering
        }])

        # Apply same feature engineering
        df['Price_per_SqFt'] = df['Rent Price'] / df['Area']
        df['Price_per_SqFt'] = df['Price_per_SqFt'].fillna(df['Price_per_SqFt'].max() * 2)
        df['BHK_Area_Interaction'] = df['BHK'] * df['Area']
        df['BHK_PricePerSqFt_Interaction'] = df['BHK'] * df['Price_per_SqFt']
        df['Log_Area'] = np.log1p(df['Area'])

        df = pd.get_dummies(df, columns=['Location', 'Gym Available', 'Parking Available'], drop_first=True)

        # Ensure all required columns exist
        for col in model_columns:
            if col not in df.columns:
                df[col] = 0

        df = df[model_columns]

        # Make prediction
        log_pred = model.predict(df)[0]
        predicted_price = np.expm1(log_pred)  # inverse log1p

        return {
            "success": True,
            "price": round(predicted_price, 2)
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
