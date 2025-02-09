import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from sklearn.metrics import mean_squared_error
import pickle
import os
import tensorflow as tf  # Import tensorflow

def generate_ev_route_data(num_samples=1000):
    """Generates synthetic data for EV energy consumption."""

    data = {
        'route_length_km': np.random.exponential(scale=50, size=num_samples),  # Exponential
        'avg_speed_kmh': np.random.normal(loc=40, scale=10, size=num_samples),  # Normal
        'elevation_gain_m': np.random.randint(0, 500, size=num_samples),  # Integer
        'traffic_density': np.random.uniform(0, 1, size=num_samples),  # Uniform
        'weather_condition': np.random.randint(1, 4, size=num_samples),  # 1=Good, 2=Moderate, 3=Bad
        'vehicle_weight_kg': np.random.normal(loc=1500, scale=200, size=num_samples),  # Normal
        'battery_capacity_kwh': np.random.normal(loc=60, scale=10, size=num_samples),  # Normal
        'avg_temperature_c': np.random.normal(loc=20, scale=5, size=num_samples),  # Normal
        'energy_consumption_kwh': np.random.normal(loc=30, scale=5, size=num_samples)  # Energy used
    }

    df = pd.DataFrame(data)

    # Adjust 'energy_consumption_kwh' based on features (simulating model behavior)
    df['energy_consumption_kwh'] = (
        df['route_length_km'] * 0.1 +  # Base consumption
        df['elevation_gain_m'] * 0.005 +  # Up hill travel increases consumption
        df['traffic_density'] * 5 +  # Stop go traffic uses more power
        df['weather_condition'].apply(lambda w: 5 if w == 3 else 0) +  # If conditions are bad
        df['vehicle_weight_kg'] * 0.001 +
        df['avg_temperature_c'].apply(lambda t: 2 if t < 10 or t > 30 else 0) +  # Extreme temps use power
        np.random.normal(0, 2, num_samples)  # Add Randomness
    ).round(2)

    # Ensure No negative values
    df['route_length_km'] = np.abs(df['route_length_km'])
    df['avg_speed_kmh'] = np.abs(df['avg_speed_kmh'])
    df['vehicle_weight_kg'] = np.abs(df['vehicle_weight_kg'])
    df['battery_capacity_kwh'] = np.abs(df['battery_capacity_kwh'])
    df['avg_temperature_c'] = np.abs(df['avg_temperature_c'])
    df['energy_consumption_kwh'] = np.abs(df['energy_consumption_kwh'])

    return df


def train_ev_energy_model(csv_file_path, model_output_path):
    """Trains a Neural Network model for EV energy consumption and saves the model as .pkl."""

    try:
        # 1. Load Data
        df = pd.read_csv(csv_file_path)

        # 2. Define Features and Target
        features = [
            'route_length_km', 'avg_speed_kmh', 'elevation_gain_m',
            'traffic_density', 'weather_condition', 'vehicle_weight_kg',
            'battery_capacity_kwh', 'avg_temperature_c'
        ]
        target = 'energy_consumption_kwh'

        # Check if features exists
        for feature in features:
            if feature not in df.columns:
                raise ValueError(f"Feature '{feature}' not found in the dataset.")
        if target not in df.columns:
            raise ValueError(f"Target '{target}' not found in the dataset.")

        # 3. Prepare Data
        X = df[features]
        y = df[target]
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # 4. Scale the data - IMPORTANT for Neural Networks
        scaler = StandardScaler()
        X_train = scaler.fit_transform(X_train)
        X_test = scaler.transform(X_test)

        # 5. Define the ANN Model
        model = Sequential([
            Dense(64, activation='relu', input_shape=(X_train.shape[1],)),  # Input Layer
            Dense(32, activation='relu'),  # Hidden Layer
            Dense(1)  # Output Layer (Regression)
        ])

        # 6. Compile the Model
        model.compile(optimizer='adam', loss='mse')  # Mean Squared Error Loss

        # 7. Train the Model
        model.fit(X_train, y_train, epochs=50, batch_size=32, verbose=0)  # Train the model

        # 8. Evaluate Model
        y_pred = model.predict(X_test)
        rmse = np.sqrt(mean_squared_error(y_test, y_pred))
        print(f"RMSE: {rmse:.4f}")

        # 9. Create a dictionary containing the model and the scaler
        model_data = {
            'model': model,
            'scaler': scaler
        }

        # 10. Save the combined scaler and model to .pkl
        with open(model_output_path, 'wb') as file:
            pickle.dump(model_data, file)
        print(f"Model and scaler saved to {model_output_path}")

    except FileNotFoundError:
        print(f"Error: File not found at {csv_file_path}")
    except ValueError as ve:
        print(f"ValueError: {ve}")
    except Exception as e:
        print(f"An error occurred: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    # Parameters
    DATASET_DIRECTORY = "/Users/777bhavyagoyal/Developer/LOC7/jinx.js_LOC7/datsets"
    CSV_FILE_PATH = os.path.join(DATASET_DIRECTORY, "ev_energy_data.csv")
    MODEL_OUTPUT_PATH = os.path.join(DATASET_DIRECTORY, "ev_energy_model.pkl")

    # Create dataset directory if it doesn't exist
    if not os.path.exists(DATASET_DIRECTORY):
        os.makedirs(DATASET_DIRECTORY)

    # Generate data
    ev_data = generate_ev_route_data()
    ev_data.to_csv(CSV_FILE_PATH, index=False)

    # Train model
    train_ev_energy_model(CSV_FILE_PATH, MODEL_OUTPUT_PATH)