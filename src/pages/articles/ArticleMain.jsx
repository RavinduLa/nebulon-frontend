/*
* @Author = A.M.W.W.R.L. Wataketiya (MS2346644)
* Component to manage article functions centraly
* Maybe removed in the future
* */


import {Component} from "react";
import {Link} from "react-router-dom";

class ArticleMain extends Component{

    render() {
        return (
            <div>
                <Link to={'/create-article'}>Create Article</Link>
                <br />
                <Link to={'/view-articles'}>View All Articles</Link>
            </div>
        );
    }
}

export default ArticleMain;