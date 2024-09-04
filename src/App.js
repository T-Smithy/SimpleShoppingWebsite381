import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter as Router and Routes
import Homepage from './components/Homepage';
import Productpage from './components/Productpage';
import LoginPage from './components/LoginPage';



const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={authenticated ? <Productpage /> : <LoginPage setAuthenticated={setAuthenticated} />}/>
          <Route path="/login" element={<LoginPage  setAuthenticated={setAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
