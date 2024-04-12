import {Component} from "react";
import ArticleService from "../../services/ArticleService";
import {CardText} from "react-bootstrap";


class ViewAllArticles extends Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        articles : []
    }

    componentDidMount() {
        ArticleService.getAllArticles()
            .then(response => response.data)
            .then((data) => {
                this.setState({articles : data})
            }).catch(error => {
                console.log("Error in getting all articles");
        })

    }

    render() {
        return (
            <div>
                <div className={'container-fluid'}>
                    <h1>All Articles</h1>
                    <br/>
                    {
                        this.state.articles.length === 0?
                            <h3>No articles yet</h3> :
                            this.state.articles.map( (article) => (
                                <div>
                                    <h4>{article.title}</h4>
                                    {/*<div dangerouslySetInnerHTML={{ __html:article.content }} />*/}
                                    <div>
                                        {article.summary}
                                    </div>

                                    <br/>
                                </div>
                            ))
                    }
                </div>


            </div>
        );
    }
}

export default ViewAllArticles;