import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import NavigationBar from './Components/Navigation/NavigationBar';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavigationBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
