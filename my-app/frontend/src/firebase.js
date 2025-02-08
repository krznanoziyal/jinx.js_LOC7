import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import app from "../firebase/firebase";

const db = getDatabase(app);

const firebaseConfig = {
  apiKey: "AIzaSyCnkmcyWUWgtEKNWTgzjXCyFWQgjFPg6Yk",
  authDomain: "mumbaihacks-dd152.firebaseapp.com",
  databaseURL: "https://mumbaihacks-dd152-default-rtdb.firebaseio.com",
  projectId: "mumbaihacks-dd152",
  storageBucket: "mumbaihacks-dd152.appspot.com",
  messagingSenderId: "495585848536",
  appId: "1:495585848536:web:02d9e92a297f9f93aa3bad",
  measurementId: "G-X2H9K569EJ",
};

const app = initializeApp(firebaseConfig);

export const writeData = (path, data) => {
  set(ref(db, path), data)
    .then(() => {
      console.log("Data written successfully!");
    })
    .catch((error) => {
      console.error("Error writing data: ", error);
    });
};

export const readData = (path, callback) => {
  const dataRef = ref(db, path);
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};
export default app;
