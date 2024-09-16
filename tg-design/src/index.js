// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LocalizationProvider } from './context/LocalizationContext';
import "./App.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LocalizationProvider>
      <App />
    </LocalizationProvider>
  </React.StrictMode>
);

reportWebVitals();
