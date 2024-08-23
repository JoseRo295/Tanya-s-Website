import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "../src/pages/Home";
import Otro from "../src/pages/Otro";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/otro" element={<Otro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
