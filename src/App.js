import logo from './logo.svg';
import './App.css';
import React from "react";
import {BrowserRouter as Router, Redirect, Routes, Route} from "react-router-dom";


import Home from "./pages/home/Home";
import MainNavbar from "./components/navbars/MainNavbar";
import LoginNeeded from "./pages/error/LoginNeeded";
import NoPermission from "./pages/error/NoPermission";
import CreateArticle from "./pages/articles/CreateArticle";

function App() {
  return (
    <div className="App">
      <Router>
          <MainNavbar />
        <Routes>
          <Route exact path="/" element={<Home/>} />

            {/*Authenticated and Authorization*/}
            <Route path={"/login-needed"} element={<LoginNeeded/>} />
            <Route path={"/no-permission"} element={<NoPermission/>} />

            {/*Articles*/}
            <Route path={"/articles/create-article"} element={<CreateArticle/>} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
