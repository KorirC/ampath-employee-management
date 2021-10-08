import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, useHistory, Switch } from 'react-router-dom';
import './App.css';
import NavigationBar from './Components/Navigation/NavigationBar';
import { Login } from './Components/Login/login';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import { Register } from './Components/Register/register';

const token = localStorage.getItem('token');

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/Home">
        <NavigationBar />
      </Route>
      <Route exact path="/RegisterUser">
        <Register />
      </Route>
    </Router>
  );
}

export default App;
