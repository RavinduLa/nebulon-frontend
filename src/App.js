import logo from './logo.svg';
import './App.css';
import React from "react";
import {BrowserRouter as Router, Navigate, Routes, Route} from "react-router-dom";


import Home from "./pages/home/Home";
import MainNavbar from "./components/navbars/MainNavbar";
import LoginNeeded from "./pages/error/LoginNeeded";
import NoPermission from "./pages/error/NoPermission";
import CreateArticle from "./pages/articles/CreateArticle";
import ArticleMain from "./pages/articles/ArticleMain";
import ViewAllArticles from "./pages/articles/ViewAllArticles";
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ArticleDetailReaderView from "./pages/articles/ArticleDetailReaderView";
import ViewAuthorArticles from "./pages/articles/ViewAuthorArticles";
import ArticleDetailAuthorPreview from "./pages/articles/ArticleDetailAuthorPreview";
import EditArticle from "./pages/articles/EditArticle";
import Error404 from "./pages/error/Error404";
import AuthorDashboard from "./pages/dashboard/AuthorDashboard";

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
            <Route path={"/error-not-found"} element={<Error404/>} />


            <Route path={"/author-dashboard"} element={<AuthorDashboard/>} />

            {/*Articles*/}
            <Route path={"/articles-main"} element={<ArticleMain/>} />
            <Route path={"/create-article"} element={<CreateArticle/>} />
            <Route path={"/view-articles"} element={<ViewAllArticles />} />
            <Route path={"/view-articles-author"} element={<ViewAuthorArticles />} />
            <Route path={"/article-detail-reader/:id"} element={<ArticleDetailReaderView />} />
            <Route path={"/article-detail-author-preview/:id"} element={<ArticleDetailAuthorPreview />} />
            <Route path={"/article-edit-view/:id"} element={<EditArticle />} />



          {/*Default route - 404*/}
          <Route
              path="*"
              element={<Navigate to="/error-not-found" replace={true} />}
          />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
