// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LocalizationProvider } from './context/LocalizationContext';
import { ThemeProvider } from './context/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import "./App.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <LocalizationProvider>
          <App />
        </LocalizationProvider>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
