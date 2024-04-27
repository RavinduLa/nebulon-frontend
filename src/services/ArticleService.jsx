/*
* @Autohor
* @Description - Service class for Articles
* All remote API calls are handled here
*
* */


import axios from "axios";
import base_url from "./deployment.json";
import {Component} from "react";
import AuthHeader from "./AuthHeader";

const URL_FOR_ARTICLE = "/api/articles";

const API_URL = base_url.localAddress + URL_FOR_ARTICLE;
const API_URL_LOCAL = base_url.localAddress + URL_FOR_ARTICLE;
const API_URL_REMOTE = base_url.remoteAddress + URL_FOR_ARTICLE;

class ArticleService extends Component{
    static createArticle = (article) => {
        return axios.post(API_URL + "/create", article, AuthHeader);
    }

    static getAllArticles = () => {
        return axios.get(API_URL + "/getAll", AuthHeader);
    }

    static getArticleById = (id) => {
        return axios.get(API_URL + `/getById/${id}`, AuthHeader);
    }

    static getArticlesByAuthorId = (authorId) => {
        return axios.get(API_URL + `/getByAuthorId/${authorId}`, AuthHeader)
    }

    static updateArticle = (article) => {
        return axios.put(API_URL + "/updateArticle", article, AuthHeader);
    }

    static publishArticle = (articleId) => {
        return axios.put(API_URL + `/publish/${articleId}`, AuthHeader);
    }

    static unPublishArticle = (articleId) => {
        return axios.put(API_URL + `/unpublish/${articleId}`, AuthHeader);
    }

    static  deleteArticle = (articleId) => {
        return axios.delete(API_URL + `/delete/${articleId}`, AuthHeader);
    }
}

export default ArticleService;