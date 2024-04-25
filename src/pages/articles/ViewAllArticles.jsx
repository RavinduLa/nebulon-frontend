import {Component} from "react";
import ArticleService from "../../services/ArticleService";
import {Card, CardText, CardTitle, Col, Row} from "react-bootstrap";
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
        color : '#8C8AFF'
    }
    commentLinkStyle = {
        float: 'left',
        textAlign: 'left',
        color : '#8C8AFF',
        marginLeft: '20px'
    }

    readLinkStyle = {
        float: 'left',
        textAlign: 'left',
        color : '#8C8AFF',
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
                                            <CardText style={this.articleItemEmailStyle}>{article.authorId}</CardText>
                                            <CardText style={this.articleItemSummaryStyle}>{article.summary}</CardText>
                                        </Card.Body>

                                        <Card.Footer className={'border-0 bg-transparent'}>
                                            <Link style={this.readLinkStyle} to={'/'}>Read</Link>
                                            <Link style={this.commentLinkStyle} to={'/'}>Comment</Link>
                                        </Card.Footer>

                                    </Card>

                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>

                                    {/*<h4 style={this.articleItemHeaderStyle}>{article.title}</h4>
                                    <p style={this.articleItemEmailStyle}>{article.authorId}</p>

                                    <p style={this.articleItemSummaryStyle}>{article.summary}</p>*/}


                                    {/*<div dangerouslySetInnerHTML={{ __html:article.content }} />*/}
                                </div>
                            ))
                    }
                </div>


            </div>
        );
    }
}

export default ViewAllArticles;