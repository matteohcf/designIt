import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>  {/* Implementazione Store */}
      <BrowserRouter> {/* Implementazione delle routes */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);