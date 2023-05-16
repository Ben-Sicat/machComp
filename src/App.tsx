import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Simpson, Home } from './pages/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/Simpson" element={<Simpson />} />
        {/* <Route path="/machinefour" element={} /> */}
      </Routes>
    </Router>
  );
}

export default App;
