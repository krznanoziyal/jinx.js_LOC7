import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, StratifiedKFold
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, classification_report
import pickle
import os
import optuna
import xgboost as xgb  # Import XGBoost here as well.
from sklearn.preprocessing import LabelEncoder


def objective(trial, X, y):
    """Objective function for Optuna to minimize (error) - WITHOUT early stopping."""

    param = {
        'objective': 'multi:softmax',
        'num_class': len(np.unique(y)),
        'eval_metric': 'merror',  # Multi-error rate (misclassification rate)
        'booster': trial.suggest_categorical('booster', ['gbtree', 'gblinear', 'dart']),  # Different ways to build
        'lambda': trial.suggest_float('lambda', 1e-8, 1.0, log=True),
        'alpha': trial.suggest_float('alpha', 1e-8, 1.0, log=True),
        'subsample': trial.suggest_float('subsample', 0.5, 1.0),
        'colsample_bytree': trial.suggest_float('colsample_bytree', 0.5, 1.0),
        'max_depth': trial.suggest_int('max_depth', 3, 9),
        'learning_rate': trial.suggest_float('learning_rate', 0.005, 0.1),  # This is lower than the original notebook to avoid overshooting
        'random_state': 42,  # Keep random state for reproducibility
    }

    # Handle conditional parameters
    if param['booster'] in ['gbtree', 'dart']:
        param['gamma'] = trial.suggest_float('gamma', 1e-8, 1.0, log=True)
        param['grow_policy'] = trial.suggest_categorical('grow_policy', ['depthwise', 'lossguide'])  # Add grow policy
    if param['booster'] == 'dart':
        param['sample_type'] = trial.suggest_categorical('sample_type', ['uniform', 'weighted'])
        param['normalize_type'] = trial.suggest_categorical('normalize_type', ['tree', 'forest'])
        param['rate_drop'] = trial.suggest_float('rate_drop', 1e-8, 1.0, log=True)  # Rate Drop

    # Use StratifiedKFold for classification to maintain class balance across folds
    cv = StratifiedKFold(n_splits=3, shuffle=True, random_state=42)  # Reduced K Folds to make training faster
    cv_scores = np.empty(cv.get_n_splits())  # Stores the error
    for idx, (train_idx, test_idx) in enumerate(cv.split(X, y)):
        X_train, X_test = X.iloc[train_idx], X.iloc[test_idx]
        y_train, y_test = y.iloc[train_idx], y.iloc[test_idx]

        model = XGBClassifier(**param)

        #Fit the model WITHOUT early stopping
        model.fit(X_train, y_train)

        preds = model.predict(X_test)
        cv_scores[idx] = accuracy_score(y_test, preds)

    return 1.0 - np.mean(cv_scores)  # We minimize *error*, hence 1 - accuracy


def train_transport_model(csv_file_path, model_output_path, n_trials=25):
    """Trains an XGBoost model with Optuna for hyperparameter tuning."""

    import xgboost as xgb  # Import XGBoost HERE at the beginning

    try:
        # 1. Load Data
        df = pd.read_csv(csv_file_path)

        # 2. Data Preprocessing
        # Label Encoding
        def labelencoder(df):
            for c in df.columns:
                if df[c].dtype == 'object':
                    df[c] = df[c].fillna('N')
                    lbl = LabelEncoder()
                    lbl.fit(list(df[c].values))
                    df[c] = lbl.transform(df[c].values)
            return df

        df = labelencoder(df)

        # Define Features and Target - MUST match columns in your CSV
        features = [
            'distance_km', 'parcel_weight_kg', 'traffic_density',
            'time_of_day', 'weather_condition', 'city_type', 'delivery_urgency'
        ]
        target = 'transport_mode'  # bike/truck/car - needs to be numerical

        X = df[features]
        y = df[target]

        # 3. Run Optuna Optimization
        study = optuna.create_study(direction='minimize')
        study.optimize(lambda trial: objective(trial, X, y), n_trials=n_trials)

        print("Number of finished trials: {}".format(len(study.trials)))
        print("Best trial: {}".format(study.best_trial.params))

        best_params = study.best_params
        # 4. Train Final Model With Best Hyperparameters

        final_model = XGBClassifier(
            objective='multi:softmax',
            num_class=len(np.unique(y)),
            eval_metric='merror',
            random_state=42,
            **best_params
        )
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        final_model.fit(X_train, y_train)  #NO EARLY STOPPING

        # 5. Evaluate Model
        y_pred = final_model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        print(f"Final Model Accuracy: {accuracy:.4f}")
        print(classification_report(y_test, y_pred))

        # 6. Save Model
        with open(model_output_path, 'wb') as file:
            pickle.dump(final_model, file)
        print(f"Model saved to {model_output_path}")

    except FileNotFoundError:
        print(f"Error: File not found at {csv_file_path}")
    except Exception as e:
        print(f"An error occurred: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    DATASET_DIRECTORY = "/Users/777bhavyagoyal/Developer/LOC7/jinx.js_LOC7/datsets"
    CSV_FILE_PATH = os.path.join(DATASET_DIRECTORY, "transport_data.csv")
    MODEL_OUTPUT_PATH = "transport_model.pkl"

    # Create the dataset directory if it doesn't exist
    if not os.path.exists(DATASET_DIRECTORY):
        os.makedirs(DATASET_DIRECTORY)

    # Example data generation (replace with your actual data loading) - Adjusted
    num_samples = 1000  # Increased Sample Size

    data = {
        'distance_km': np.random.exponential(scale=10, size=num_samples),
        'parcel_weight_kg': np.random.normal(loc=5, scale=2, size=num_samples),
        'traffic_density': np.random.randint(1, 6, size=num_samples),
        'time_of_day': np.random.randint(0, 24, size=num_samples),
        'weather_condition': np.random.randint(1, 4, size=num_samples),
        'city_type': np.random.randint(1, 4, size=num_samples),
        'delivery_urgency': np.random.randint(1, 11, size=num_samples),
        'transport_mode': np.random.choice([0, 1, 2], size=num_samples, p=[0.6, 0.2, 0.2])
    }

    # Ensure no negative values for certain features
    data['distance_km'] = np.abs(data['distance_km'])
    data['parcel_weight_kg'] = np.abs(data['parcel_weight_kg'])

    df = pd.DataFrame(data)
    df.to_csv(CSV_FILE_PATH, index=False)

    train_transport_model(CSV_FILE_PATH, MODEL_OUTPUT_PATH, n_trials=25)