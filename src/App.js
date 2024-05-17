import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login.js';
import Weather from './Pages/Weather/Weather.js';

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/weather" element={<Weather/>}/>
        </Routes>
    </Router>
  );
}

export default App;
