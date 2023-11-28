import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './body.css'
import './components/Auth/auth.css'

createRoot(document.querySelector('#root')).render(<App />);