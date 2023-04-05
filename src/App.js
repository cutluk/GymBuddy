/*import React, { useState } from 'react'
import './App.css'
import Switch from 'react-ios-switch'

import Advanced from './examples/Advanced'
import Simple from './examples/Simple'

function App () {
  const [showAdvanced, setShowAdvanced] = useState(true)

  return (
    <div className='app'>
      {showAdvanced ? <Advanced /> : <Simple />}
      <div className='row'>
        <p style={{ color: '#fff' }}>Show advanced example</p> <Switch checked={showAdvanced} onChange={setShowAdvanced} />
      </div>
    </div>
  )
}

export default App
*/

import React from 'react';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Login from './examples/Login';
import Signup from './examples/Signup';
import ProtectedRoute from './auth/ProtectedRoute';
import Advanced from './examples/Advanced';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<ProtectedRoute/>}>
        <Route path="" element={<Advanced />} />
      </Route>
    </Routes>
  );
};

export default App;