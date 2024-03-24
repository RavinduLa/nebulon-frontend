import logo from './logo.svg';
import './App.css';
import React from "react";
import {BrowserRouter as Router, Redirect, Routes, Route} from "react-router-dom";


import Home from "./pages/home/Home";
import MainNavbar from "./components/navbars/MainNavbar";

function App() {
  return (
    <div className="App">
      <Router>
          <MainNavbar />
        <Routes>
          <Route exact path="/" element={<Home/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
