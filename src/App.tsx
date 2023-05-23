import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Trapezoid } from './pages/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Trapezoid />} />
        {/* <Route path="/machinefour" element={} /> */}
      </Routes>
    </Router>
  );
}

export default App;
