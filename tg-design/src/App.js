import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "../src/pages/Home";
import Otro from "../src/pages/Otro";
import Services from "../src/pages/Services";
import ProjectCarousel from "../src/pages/ProjectCarousel";
import Contact from "./pages/Contacts";
import SEO from './components/SEO';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <SEO />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/otro" element={<Otro />} />
        <Route path="/services" element={<Services/>} />
        <Route path="/projectCarousel" element={<ProjectCarousel/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
