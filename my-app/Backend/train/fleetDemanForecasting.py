import pandas as pd
import numpy as np
from prophet import Prophet
from sklearn.metrics import mean_squared_error, mean_absolute_error
import os
import pickle
from datetime import datetime, date
import matplotlib.pyplot as plt


# 1. Data Generation

def generate_fleet_demand_data(start_date, end_date, num_regions=5):
    """Generates synthetic fleet demand data with specified parameters."""

    dates = pd.date_range(start=start_date, end=end_date, freq='H')
    num_data_points = len(dates)

    # Create a dictionary for each data column
    data = {
        'ds': dates,  # Timestamp

        'order_volume': np.random.randint(50, 200, size=num_data_points),  # Base order volume
        'region': np.random.randint(1, num_regions + 1, size=num_data_points),  # Region/Zone
        'traffic_conditions': np.random.uniform(0.2, 1, size=num_data_points),  # 0.2 (Light) to 1 (Heavy)
        'weather_conditions': np.random.randint(1, 4, size=num_data_points),  # 1=Good, 2=Moderate, 3=Bad
        'fleet_availability': np.random.randint(5, 20, size=num_data_points),  # Number of available vehicles
        'historical_delivery_times': np.random.normal(loc=30, scale=10, size=num_data_points), # Average delivery times
    }

    df = pd.DataFrame(data)

    # Add Time Features
    df['hour'] = df['ds'].dt.hour
    df['day_of_week'] = df['ds'].dt.dayofweek  # 0=Monday, 6=Sunday

    # Add Holiday/Weekend Indicator (simplified example)
    df['holiday_weekend'] = df['ds'].apply(lambda date: 1 if date.weekday() >= 5 or date.month == 12 and date.day == 25 else 0) # Simplified

    # Add Demand Trend (adjust order_volume based on other features)
    df['order_volume'] = (
        df['order_volume'] +
        df['hour'].apply(lambda h: 20 if 11 <= h <= 14 else 0) +  # Lunch peak
        df['holiday_weekend'].apply(lambda h: 30 if h == 1 else 0) - # More orders on weekend or holiday
        df['traffic_conditions'].apply(lambda t: -20 * t if t > 0.7 else 0) -#Less orders when high traffic
        df['fleet_availability'].apply(lambda f : 1*f if f < 10 else 0) #More orders if fleet availibility is low

    ).round().astype(int)

    df = df.rename(columns={'ds': 'ds', 'order_volume': 'y'})  # Prophet requirement

    return df


# 2. Model Training

def train_prophet_model(df, checkpoints_dir="prophet_checkpoints"):
    """Trains a Prophet model and saves the model checkpoints."""

    # Create Checkpoints Directory
    if not os.path.exists(checkpoints_dir):
        os.makedirs(checkpoints_dir)

    # Prophet Model
    model = Prophet()

    #Add Extra Regressors for Additional Data and Feature
    model.add_regressor('region')
    model.add_regressor('traffic_conditions')
    model.add_regressor('weather_conditions')
    model.add_regressor('fleet_availability')
    model.add_regressor('hour')
    model.add_regressor('day_of_week')
    model.add_regressor('holiday_weekend')
    model.add_regressor('historical_delivery_times') # Average delivery times

    # Train model
    model.fit(df)

    # Save Model
    model_path = os.path.join(checkpoints_dir, "prophet_model.pkl")
    with open(model_path, "wb") as f:
        pickle.dump(model, f)
    print(f"Model saved to {model_path}")

    return model


# 4. Main Execution

if __name__ == "__main__":
    # Data Generation Parameters
    START_DATE = "2023-01-01"
    END_DATE = "2023-01-10"
    DATASET_PATH = "/Users/777bhavyagoyal/Developer/LOC7/jinx.js_LOC7/datsets/extracted_data/fleet_demand_data.csv"
    NUM_REGIONS = 5 #You can try and increase the regions

    # Training Parameters
    CHECKPOINTS_DIR = "/Users/777bhavyagoyal/Developer/LOC7/jinx.js_LOC7/datsets/extracted_data/prophet_checkpoints"  # Checkpoints directory

    # Generate Data
    fleet_data = generate_fleet_demand_data(START_DATE, END_DATE,NUM_REGIONS)
    fleet_data.to_csv(DATASET_PATH, index=False)

    # Train Model
    model = train_prophet_model(fleet_data, CHECKPOINTS_DIR)