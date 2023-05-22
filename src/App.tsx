import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserDefined, Home, PreDefined } from './pages/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/UserDefined" element={<UserDefined />} />
        <Route path="/PreDefined" element={<PreDefined />} />
        {/* <Route path="/machinefour" element={} /> */}
      </Routes>
    </Router>
  );
}

export default App;
