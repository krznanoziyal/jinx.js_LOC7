import lightgbm as lgb
import xgboost as xgb
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sklearn.preprocessing import LabelEncoder, StandardScaler
import pickle
from haversine import haversine, Unit
import os  # Import the 'os' module
from fastapi.responses import JSONResponse  # Import JSONResponse
from prophet import Prophet
import tensorflow as tf
from tensorflow import keras
import uvicorn

app = FastAPI()

# --- 1. Model Loading ---
# This needs to be updated for your specific Path

DELIVERY_MODEL_PATH = "/Users/777bhavyagoyal/Developer/jinx.js_LOC7/my-app/Backend/models/deliveryTime1.pkl"  # Delivery time model
TRANSPORT_MODEL_PATH = "/Users/777bhavyagoyal/Developer/jinx.js_LOC7/my-app/Backend/models/transport_model.pkl"  # Transport mode model
FLEET_DEMAND_MODEL_PATH = "/Users/777bhavyagoyal/Developer/jinx.js_LOC7/my-app/Backend/models/fleetDemand.pkl"
EV_ENERGY_MODEL_PATH = "/Users/777bhavyagoyal/Developer/jinx.js_LOC7/my-app/Backend/models/ev_energy_model.pkl"

delivery_model = None
transport_model = None
fleet_demand_model = None
ev_energy_model_data = None  # Will store both model and scaler

try:
    with open(DELIVERY_MODEL_PATH, 'rb') as file:
        delivery_model = pickle.load(file)
    if not isinstance(delivery_model, lgb.LGBMRegressor):
        raise ValueError("Loaded object is not a LightGBM Regressor for delivery time prediction.")
    print(f"Delivery time model loaded successfully from {DELIVERY_MODEL_PATH}")
except FileNotFoundError:
    print(f"Error: Delivery time model file not found at {DELIVERY_MODEL_PATH}.")
except Exception as e:
    print(f"Error loading delivery time model: {e}")

try:
    with open(TRANSPORT_MODEL_PATH, 'rb') as file:
        transport_model = pickle.load(file)
    if not isinstance(transport_model, xgb.XGBClassifier):
        raise ValueError("Loaded object is not an XGBClassifier for transport mode classification.")
    print(f"Transport mode model loaded successfully from {TRANSPORT_MODEL_PATH}")
except FileNotFoundError:
    print(f"Error: Transport mode model file not found at {TRANSPORT_MODEL_PATH}.")
except Exception as e:
    print(f"Error loading transport mode model: {e}")

try:
    with open(FLEET_DEMAND_MODEL_PATH, 'rb') as file:
        fleet_demand_model = pickle.load(file)
    if not isinstance(fleet_demand_model, Prophet):
        raise ValueError("Loaded object is not a Prophet model for fleet demand forecasting.")
    print(f"Fleet demand model loaded successfully from {FLEET_DEMAND_MODEL_PATH}")
except FileNotFoundError:
    print(f"Error: Fleet demand model file not found at {FLEET_DEMAND_MODEL_PATH}.")
except Exception as e:
    print(f"Error loading fleet demand model: {e}")

try:
    with open(EV_ENERGY_MODEL_PATH, 'rb') as file:
        ev_energy_model_data = pickle.load(file)
    if not isinstance(ev_energy_model_data, dict) or 'model' not in ev_energy_model_data or 'scaler' not in ev_energy_model_data:
        raise ValueError("Loaded object is not a dictionary with 'model' and 'scaler' keys for energy consumption prediction.")

    if not isinstance(ev_energy_model_data['model'], tf.keras.models.Sequential):
        raise ValueError("Model is not a TensorFlow Sequential model.")

    print(f"EV energy model loaded successfully from {EV_ENERGY_MODEL_PATH}")
except FileNotFoundError:
    print(f"Error: EV energy model file not found at {EV_ENERGY_MODEL_PATH}.")
except Exception as e:
    print(f"Error loading EV energy model: {e}")


# --- 2. Data Input Validation Models ---

class DeliveryData(BaseModel):

    Delivery_person_Age: float
    Delivery_person_Ratings: float
    Restaurant_latitude: float
    Restaurant_longitude: float
    Delivery_location_latitude: float
    Delivery_location_longitude: float
    Type_of_order: str
    Type_of_vehicle: str
    multiple_deliveries: float
    Festival: str
    City: str
    Weatherconditions: str
    Road_traffic_density: str
    Vehicle_condition: float

    Time_Orderd: str
    Time_Order_picked: str
    Order_Date: str

class TransportData(BaseModel):
    distance_km: float
    parcel_weight_kg: float
    traffic_density: int
    time_of_day: int
    weather_condition: int
    city_type: int
    delivery_urgency: int

class FleetDemandData(BaseModel):
    ds: str  # Datetime
    region: int
    traffic_conditions: float
    weather_conditions: int
    fleet_availability: int
    historical_delivery_times: float
    hour: int
    day_of_week: int
    holiday_weekend: int

class EvEnergyData(BaseModel):
    route_length_km: float
    avg_speed_kmh: float
    elevation_gain_m: int
    traffic_density: float
    weather_condition: int
    vehicle_weight_kg: float
    battery_capacity_kwh: float
    avg_temperature_c: float

# --- 3. Data Preparation Functions ---

def prepare_delivery_data(data: DeliveryData) -> pd.DataFrame:
    """Prepares delivery data for prediction (same as before)."""
    input_df = pd.DataFrame([data.dict()])

    # Feature Engineering: Distance Calculation
    def distance_km(row):
        coord1 = (row['Restaurant_latitude'], row['Restaurant_longitude'])
        coord2 = (row['Delivery_location_latitude'], row['Delivery_location_longitude'])
        distance = haversine(coord1, coord2, unit=Unit.KILOMETERS)
        return distance

    input_df['Distance_km'] = input_df.apply(distance_km, axis=1)

    # Label Encoding
    categorical_cols = [
        'Type_of_order', 'Type_of_vehicle', 'Festival', 'City', 'Weatherconditions',
        'Road_traffic_density', 'Time_Orderd', 'Time_Order_picked', 'Order_Date'
    ]
    for c in categorical_cols:
        input_df[c] = input_df[c].fillna('N')
        lbl = LabelEncoder()
        lbl.fit(list(input_df[c].values))
        input_df[c] = lbl.transform(input_df[c].values)

    # Ensure Required Columns are Present
    required_columns = [

        'Delivery_person_Age', 'Delivery_person_Ratings', 'Restaurant_latitude',
        'Restaurant_longitude', 'Delivery_location_latitude', 'Delivery_location_longitude',
        'Type_of_order', 'Type_of_vehicle', 'multiple_deliveries', 'Festival', 'City',
        'Weatherconditions', 'Road_traffic_density', 'Vehicle_condition',
        'Time_Orderd', 'Time_Order_picked', 'Order_Date'
    ]
    input_df = input_df[required_columns]

    return input_df


def prepare_transport_data(data: TransportData) -> pd.DataFrame:
    """Prepares transport data for prediction."""
    input_df = pd.DataFrame([data.dict()])
    return input_df  # No label encoding required as the data is numerical already.

def prepare_fleet_demand_data(data: FleetDemandData) -> pd.DataFrame:
    """Prepares fleet demand data for prediction with Prophet."""
    input_df = pd.DataFrame([data.dict()])
    input_df['ds'] = pd.to_datetime(input_df['ds'])
    #Also rename columns as requested here
    required_columns = [
        'ds', 'region', 'traffic_conditions', 'weather_conditions',
        'fleet_availability', 'historical_delivery_times', 'hour',
        'day_of_week', 'holiday_weekend'
    ]

    # Ensure only required columns are present in the DataFrame
    input_df = input_df[required_columns]

    return input_df

def prepare_ev_energy_data(data: EvEnergyData) -> pd.DataFrame:
    """Prepares EV energy data for prediction. Includes scaling."""
    input_df = pd.DataFrame([data.model_dump()])
    print(input_df)
    required_columns = [
        'route_length_km', 'avg_speed_kmh', 'elevation_gain_m',
        'traffic_density', 'weather_condition', 'vehicle_weight_kg',
        'battery_capacity_kwh', 'avg_temperature_c'
    ]
    input_df = input_df[required_columns]
    print(input_df)
    return input_df

# --- 4. Prediction Endpoints ---

@app.post("/predict_delivery_time")
async def predict_delivery_time(data: DeliveryData):
    """Predicts delivery time using the LightGBM model."""
    try:
        if delivery_model is None:
            raise HTTPException(status_code=500, detail="Delivery time model not loaded.")

        input_data = prepare_delivery_data(data)
        prediction = delivery_model.predict(input_data)

        # Ensure positive and integer output
        predicted_time = max(0, int(prediction[0]))

        return JSONResponse({"predicted_delivery_time": predicted_time})

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/predict_transport_mode")
async def predict_transport_mode(data: TransportData):
    """Predicts transport mode using the XGBoost model."""
    try:
        if transport_model is None:
            raise HTTPException(status_code=500, detail="Transport mode model not loaded.")

        input_data = prepare_transport_data(data)
        prediction = transport_model.predict(input_data)

        # Map prediction (0, 1, 2) back to transport mode names
        transport_modes = {0: "Bike", 1: "Car", 2: "Truck"}
        predicted_mode = transport_modes.get(prediction[0], "Unknown")  # Default to "Unknown" if not in map

        return JSONResponse({"predicted_transport_mode": predicted_mode})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/predict_fleet_demand")
async def predict_fleet_demand(data: FleetDemandData):
    """Predicts fleet demand using the Prophet model."""
    try:
        if fleet_demand_model is None:
            raise HTTPException(status_code=500, detail="Fleet demand model not loaded.")

        input_data = prepare_fleet_demand_data(data)
        forecast = fleet_demand_model.predict(input_data)
        predicted_demand = abs(forecast['yhat'].iloc[0])

        # Ensure positive and integer output
        predicted_demand_int = max(0, int(predicted_demand))

        return JSONResponse({"predicted_fleet_demand": predicted_demand_int})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/predict_ev_energy_consumption")
async def predict_ev_energy_consumption(data: EvEnergyData):
    """Predicts EV energy consumption using the ANN model."""
    try:
        if ev_energy_model_data is None:
            raise HTTPException(status_code=500, detail="EV energy model not loaded.")

        # Extract the model and scaler from the loaded dictionary
        model = ev_energy_model_data['model']
        scaler = ev_energy_model_data['scaler']

        # Prepare the data
        input_df = prepare_ev_energy_data(data)

        # Scale the input - convert to np array to feed through model
        scaled_input = scaler.transform(input_df)

        # make the prediction
        prediction = model.predict(scaled_input)

        # Ensure positive and integer output
        predicted_energy = max(0, int(prediction[0][0]))

        # Return
        return JSONResponse({"predicted_energy_consumption_kwh": predicted_energy})

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- 5. Run the API ---

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)