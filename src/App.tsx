import React from 'react';
import './App.css';
import  {Home, MachineFour}  from './pages/index'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/machinefour" element={<MachineFour />} />
    </Routes>

  );
}

export default App;
