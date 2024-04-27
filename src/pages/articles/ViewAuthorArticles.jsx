/*
* @Author = A.M.W.W.R.L. Wataketiya (MS2346644)
* Component to view articles of the current author
* */

import {Component} from "react";
import ArticleService from "../../services/ArticleService";
import {Badge, Button, Card, CardText, Col, Modal, Row} from "react-bootstrap";
import CheckAuth from "../../services/CheckAuth";
import data from "bootstrap/js/src/dom/data";
import Toast1 from "../../components/toasts/Toast1";
import Toast2 from "../../components/toasts/Toast2";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

class ViewAuthorArticles extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.email = props.userEmail;
    }

    initialState = {
        articles : [],
        showDeleteSuccess: false,
        showDeleteFailure: false
    }

    requestDelete(id) {

        confirmAlert({
            title: "Delete this article?",
            message: "This action cannot be undone",
            buttons: [
                {
                    label:"Delete",
                    onClick: this.deleteArticle.bind(this, id)
                },
                {
                    label: "Cancel",
                    onClick: this.cancelDelete.bind(this)
                }
            ]
        });
    }

    cancelDelete = () =>{

    }

    mockDelete = (id) => {

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

    deleteArticle = async (id) => {
        ArticleService.deleteArticle(id)
            .then(response => response.data)
            .then( (data) => {
                if(data != null) {
                    this.setState( {showDeleteSuccess : true});
                    setTimeout(() => this.setState({showDeleteSuccess:false}),3000);
                    this.loadArticles();
                }
            }).catch(error => {
            this.setState( {showDeleteFailure : true});
            setTimeout(() => this.setState({showDeleteFailure:false}),3000);
        });
    }

    loadArticles = async () => {
        ArticleService.getArticlesByAuthorId(this.state.email)
            .then(response => response.data)
            .then((data) => {
                this.setState({articles : data})
            }).catch(error => {
            console.log("Error in getting all articles");
        })
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

    badgeStyle = {
        float : 'left',
        marginLeft: '20px',
        marginTop: '9px'
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
                    <div style={{'display': this.state.showDeleteSuccess ? 'block' : 'none'}}>
                        <Toast1
                            children={{
                                show: this.state.showDeleteSuccess,
                                message: "Article deleted successfully",
                                type: 'success'
                            }}
                        />
                    </div>
                    <div style={{'display': this.state.showDeleteFailure ? 'block' : 'none'}}>
                        <Toast2
                            children={{
                                show: this.state.showDeleteFailure,
                                message: "Error when deleting the article",
                                type: 'danger'
                            }}
                        />
                    </div>
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
                                            <Button style={this.deleteButtonStyle}
                                                    onClick={this.requestDelete.bind(this,article.id)}
                                            >
                                                Delete
                                            </Button>
                                            {
                                                article.published ?
                                                    <Badge pill bg={'success'} style={this.badgeStyle}>Published</Badge> :
                                                    <Badge pill bg={'secondary'} style={this.badgeStyle} >Not Published</Badge>
                                            }
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