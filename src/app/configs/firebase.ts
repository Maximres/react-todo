import { initializeApp } from "firebase/app";
import { FirebaseOptions } from "@firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_ApiKey,
  authDomain: process.env.REACT_APP_AuthDomain,
  databaseURL: process.env.REACT_APP_DatabaseURL,
  projectId: process.env.REACT_APP_ProjectId,
  storageBucket: process.env.REACT_APP_StorageBucket,
  messagingSenderId: process.env.REACT_APP_MessagingSenderId,
  appId: process.env.REACT_APP_AppId,
  measurementId: process.env.REACT_APP_MeasurementId,
} as FirebaseOptions;

export const firebaseApp = initializeApp(firebaseConfig);
