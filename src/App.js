import React from 'react';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ProtectedRoute from './auth/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<ProtectedRoute/>}>
        <Route path="" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;

/**
 * <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      jordan
 */