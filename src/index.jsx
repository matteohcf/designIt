import * as React from "react";
import * as ReactDOM from "react-dom/client";
/* import { BrowserRouter } from "react-router-dom"; */
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import store from './store'
import { Provider } from 'react-redux'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDVncNZNUGzwfr4-8fBa8WxkZjyXXKmOPQ",
  authDomain: "paletteitloginregister.firebaseapp.com",
  projectId: "paletteitloginregister",
  storageBucket: "paletteitloginregister.appspot.com",
  messagingSenderId: "243089475328",
  appId: "1:243089475328:web:b4602df496a628dd4615e5",
  measurementId: "G-80R0FQKNHB"
};

const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>  {/* Implementazione Store */}
      <Router> {/* Implementazione delle routes */}
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);