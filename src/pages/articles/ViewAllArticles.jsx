/*
* @Author = A.M.W.W.R.L. Wataketiya (MS2346644)
* Component to view all published articles
* */

import {Component} from "react";
import ArticleService from "../../services/ArticleService";
import {Button, Card, CardText, CardTitle, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";


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

    navigateToArticleDetailReaderView(event, id) {
        window.location = `/article-detail-reader/${id}`;
    }

    articleItemHeaderStyle = {
        float : 'left',
        textAlign: 'left',
    }

    articleItemSummaryStyle = {
        float : 'left',
        textAlign: 'left',
    }

    articleItemEmailStyle = {
        float : 'left',
        textAlign: 'left',
        color : '#8C8AFF',
        marginLeft: '5px',
        marginTop: '6px',
    }

    articleItemEmailLabelStyle = {
        float : 'left',
        textAlign: 'left',
        color : 'black',
        marginLeft: '20px',
        marginTop: '6px',
    }
    commentButtonStyle = {
        float: 'left',
        textAlign: 'left',
        background: '#8C8AFF',
        borderColor: '#8C8AFF',
        color : 'black',
        marginLeft: '20px'
    }

    readButtonStyle = {
        float: 'left',
        textAlign: 'left',
        background: '#8C8AFF',
        borderColor: '#8C8AFF',
        color : 'black',
    }

    render() {
        return (
            <div>
                <div className={'container'}>
                    <h1>All Articles</h1>
                    <br/>
                    {
                        this.state.articles.length === 0?
                            <h3>No articles yet</h3> :
                            this.state.articles.map( (article) => (
                                <div>

                                    <Card className={'card border-0 bg-transparent'}>
                                        <Card.Header className={'bg-transparent border-0'}>
                                            <h2 style={this.articleItemHeaderStyle}>{article.title}</h2>
                                        </Card.Header>

                                        <Card.Body className={'bg-transparent border-0'}>

                                            <CardText style={this.articleItemSummaryStyle}>{article.summary}</CardText>
                                        </Card.Body>

                                        <Card.Footer className={'border-0 bg-transparent'}>
                                            <Button style={this.readButtonStyle}
                                                    onClick={ event => this.navigateToArticleDetailReaderView(this, article.id)}
                                            >
                                                Read
                                            </Button>
                                            <Button style={this.commentButtonStyle}>Comment</Button>
                                            <CardText style={this.articleItemEmailLabelStyle}>By</CardText>
                                            <CardText style={this.articleItemEmailStyle}>{article.authorId}</CardText>
                                        </Card.Footer>

                                    </Card>

                                    <br/>
                                    <br/>
                                    <br/>
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