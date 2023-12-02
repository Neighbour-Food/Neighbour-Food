import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./state/store";
import './main.css'
import './components/Auth/auth.css'
import './components/isLoading.css'

createRoot(document.querySelector("#root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);
