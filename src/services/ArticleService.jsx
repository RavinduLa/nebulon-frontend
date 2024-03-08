/*
* @Autohor
* @Description - Service class for Articles
* All remote API calls are handled here
*
* */


import axios from "axios";
import base_url from "./deployment.json";

const URL_FOR_ARTICLE = "/api/articles";

const API_URL_LOCAL = base_url.localAddress + URL_FOR_ARTICLE;
const API_URL_REMOTE = base_url.remoteAddress + URL_FOR_ARTICLE;

class ArticleService {

}