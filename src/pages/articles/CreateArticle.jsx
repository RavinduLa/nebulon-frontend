/*
* @Author = A.M.W.W.R.L. Wataketiya (MS2346644)
* Component to create a new article
* */

import {Component} from "react";
import CheckAuth from "../../services/CheckAuth";
import ArticleService from "../../services/ArticleService";
import {Form} from "react-bootstrap";


class  CreateArticle extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        title: '',
        content: '',
        createdDate: '',
    }

    componentDidMount = async () => {
    }

    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    submitArticleToRemote = async (event) => {
        event.preventDefault();
        if (this.state.title != '') {
            let article = {
                title : this.state.title,
                content: this.state.content,
                createdDate: this.state.createdDate
            }
            await ArticleService.createArticle(article).then((data) => {

            }).catch(error => {
                console.log('Error in creating new article. Error: ', error);
            });
        } else  {
            console.log('Article Title is empty.')
        }
    }

    render() {
        const {title, content, createdDate} = this.state;

        return(
            <Form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows = {5} />
                </Form.Group>
            </Form>
        );
    }

}

export default CheckAuth(CreateArticle);