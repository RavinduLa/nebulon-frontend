/*
* @Author = A.M.W.W.R.L. Wataketiya (MS2346644)
* Component to view articles of the current author
* */

import {Component} from "react";
import ArticleService from "../../services/ArticleService";
import {Button, Card, CardText} from "react-bootstrap";
import CheckAuth from "../../services/CheckAuth";

class ViewAuthorArticles extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.email = props.userEmail;
    }

    initialState = {
        articles : []
    }

    componentDidMount() {
        console.log(`Author email : ${this.state.email}`);
        ArticleService.getArticlesByAuthorId(this.state.email)
            .then(response => response.data)
            .then((data) => {
                this.setState({articles : data})
            }).catch(error => {
            console.log("Error in getting all articles");
        })

    }

    navigateToArticleDetailAuthorView(event, id) {
        window.location = `/article-detail-author-preview/${id}`;
    }

    navigateToArticleEditView(event, id) {
        window.location = `/article-edit-view/${id}`;
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
    deleteButtonStyle = {
        float: 'left',
        textAlign: 'left',
        background: '#f9436a',
        borderColor: '#f9436a',
        color : 'black',
        marginLeft: '20px'
    }

    editButtonStyle = {
        float: 'left',
        textAlign: 'left',
        background: '#8C8AFF',
        borderColor: '#8C8AFF',
        color : 'black',
        marginLeft: '20px'
    }

    previewButtonStyle = {
        float: 'left',
        textAlign: 'left',
        background: '#8C8AFF',
        borderColor: '#8C8AFF',
        color : 'black',
    }

    render() {
        return(
            <div>
                <div className={'container'}>
                    <h1>Your Articles</h1>
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
                                            <Button style={this.previewButtonStyle}
                                                    onClick={ event => this.navigateToArticleDetailAuthorView(this, article.id)}
                                            >
                                                Preview
                                            </Button>
                                            <Button style={this.editButtonStyle} onClick={event => this.navigateToArticleEditView(this, article.id)}
                                            >
                                                Edit
                                            </Button>
                                            <Button style={this.deleteButtonStyle}>Delete</Button>
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

export default CheckAuth(ViewAuthorArticles);