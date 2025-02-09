import lightgbm as lgb
import numpy as np
import pandas as pd
from sklearn.model_selection import KFold
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.preprocessing import LabelEncoder
import pickle

def train_and_predict(train_file, test_file, hyperparams, model_output_path, n_splits=5, random_state=48, drop_columns=None):
    """
    Trains a LightGBM model, generates predictions, saves the model, and prints evaluation metrics.

    Args:
        train_file (str): Path to the training data CSV file.
        test_file (str): Path to the testing data CSV file.
        hyperparams (dict): Dictionary of fixed hyperparameters.
        model_output_path (str): Path to save the trained LightGBM model (.pkl file).
        n_splits (int): Number of KFold splits for cross-validation.
        random_state (int): Random state for reproducibility.
        drop_columns (list): List of columns to drop from the dataframe.

    Returns:
        np.ndarray: Predicted values for the test dataset.
    """

    # 1. Load Data and Preprocess
    train0 = pd.read_csv(train_file)
    test0 = pd.read_csv(test_file)

    # Drop specified columns if provided
    if drop_columns:
        columns_to_drop = [col for col in drop_columns if col in train0.columns and col in test0.columns] # Ensure columns exist
        train0 = train0.drop(columns=columns_to_drop)
        test0 = test0.drop(columns=columns_to_drop)
        print(f"Dropped columns: {columns_to_drop}")

    print("Train columns:", train0.columns.tolist())

    data0 = pd.concat([train0, test0], axis=0)

    def labelencoder(df):
        for c in df.columns:
            if df[c].dtype == 'object':
                df[c] = df[c].fillna('N')
                lbl = LabelEncoder()
                lbl.fit(list(df[c].values))
                df[c] = lbl.transform(df[c].values)
        return df

    data2 = labelencoder(data0)
    train = data2.iloc[0:len(train0)]
    test = data2.iloc[len(train0):]
    print("Train size:", len(train), "Test size:", len(test))

    trainY = train['Time_taken(min)']
    trainX = train.drop('Time_taken(min)', axis=1)

    testX = test.drop('Time_taken(min)', axis=1)
    columns = trainX.columns.to_list()
    print("Features:", columns)

    # 2. Train Model with Fixed Hyperparameters using Cross-Validation
    train = trainX
    target = trainY
    test = testX
    tpreds = np.zeros((len(testX)))
    kf = KFold(n_splits=n_splits, random_state=random_state, shuffle=True)

    # Store the models from each fold and the validation predictions
    models = []
    oof_predictions = np.zeros(len(train)) # Out-of-fold predictions

    for fold, (trn_idx, val_idx) in enumerate(kf.split(train[columns], target)):
        X_tr, X_val = train[columns].iloc[trn_idx], train[columns].iloc[val_idx]
        y_tr, y_val = target.iloc[trn_idx], target.iloc[val_idx]
        model = lgb.LGBMRegressor(**hyperparams)

        # Use callbacks for early stopping in cross-validation
        callbacks = [lgb.early_stopping(100, verbose=False)]
        model.fit(X_tr, y_tr, eval_set=[(X_val, y_val)], callbacks=callbacks)

        val_preds = model.predict(X_val) #Predictions on the Validation set
        oof_predictions[val_idx] = val_preds #Store out-of-fold predictions
        tpreds += model.predict(test[columns]) / kf.n_splits  # Predictions on Test
        models.append(model)

    # Calculate and print evaluation metrics on the out-of-fold predictions
    rmse = np.sqrt(mean_squared_error(target, oof_predictions))
    r2 = r2_score(target, oof_predictions)
    mae = mean_absolute_error(target, oof_predictions)

    print("Evaluation Metrics (Out-of-Fold):")
    print(f"  RMSE: {rmse}")
    print(f"  R^2: {r2}")
    print(f"  MAE: {mae}")

    # Save the *last* trained model
    try:
        with open(model_output_path, 'wb') as file:
            pickle.dump(models[-1], file) # Save the last model
        print(f"Model saved to {model_output_path}")
    except Exception as e:
        print(f"Error saving model: {e}")

    return tpreds


if __name__ == "__main__":
    TRAIN_FILE = "/Users/777bhavyagoyal/Developer/jinx.js_LOC7/my-app/Backend/datasets/extracted_data/train.csv"
    TEST_FILE = "/Users/777bhavyagoyal/Developer/jinx.js_LOC7/my-app/Backend/datasets/extracted_data/test.csv"
    MODEL_OUTPUT_PATH = "lgbm_model.pkl"
    DROP_COLUMNS = ['ID', 'Delivery_person_ID'] # Columns to drop

    # Fixed Hyperparameterss
    BEST_HYPERPARAMS = {
        'max_depth': 9,
        'learning_rate': 0.2012789534985412,
        'num_leaves': 135,
        'lambda_l1': 0.19671303781370514,
        'lambda_l2': 7.299358120469557,
        'bagging_fraction': 0.98166976043305,
        'feature_fraction': 0.49466746134068873,
        'verbosity': 4,
        'objective': 'regression',
        'boosting_type': 'gbdt',
        'tree_method': 'hist'
    }

    predicted_values = train_and_predict(TRAIN_FILE, TEST_FILE, BEST_HYPERPARAMS, MODEL_OUTPUT_PATH, drop_columns=DROP_COLUMNS)
    print("Predicted values:", predicted_values)