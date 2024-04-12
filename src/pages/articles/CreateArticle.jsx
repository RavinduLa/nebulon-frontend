/*
* @Author = A.M.W.W.R.L. Wataketiya (MS2346644)
* Component to create a new article
* */

import {Component} from "react";
import CheckAuth from "../../services/CheckAuth";
import ArticleService from "../../services/ArticleService";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import Toast1 from "../../components/toasts/Toast1";
import Toast2 from "../../components/toasts/Toast2";
import {EditorState, convertToRaw} from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';


const getHtml = editorState =>   draftToHtml(convertToRaw(editorState.getCurrentContent()));
class  CreateArticle extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.showSuccess = false;
        this.state.showFailure = false;
        this.state.email = props.userEmail;
    }

    initialState = {
        title: '',
        content: '',
        summary: '',
        editorState: EditorState.createEmpty(),
    }

    onEditorStateChange = editorState => {
        this.setState({ editorState });
        this.setState({content: getHtml(this.state.editorState)});
    }

    componentDidMount = async () => {
    }

    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    submitArticleToRemote = async (event) => {
        event.preventDefault();
        console.log('User email :', this.state.email);
        if (this.state.title !== '') {

            let article = {
                title : this.state.title,
                content: this.state.content,
                authorId: this.state.email,
                summary: this.state.summary
            }
            await ArticleService.createArticle(article).then((data) => {
                if(data != null){
                    console.log('Created article');
                    this.setState({showSuccess : true});
                    setTimeout(() => this.setState({showSuccess:false}),3000);
                    this.resetForm();
                }
            }).catch(error => {
                console.log('Error in creating new article. Error: ', error);
                this.setState({showFailure : true});
                setTimeout(() => this.setState({showFailure:false}),3000);
            });
        } else  {
            console.log('Article Title is empty.')
        }
    }

    resetForm = async () => {
        this.setState({title : ''});
        this.setState({content : ''});
        this.setState({summary : ''});
        this.setState({editorState : EditorState.createEmpty()});
    }

    labelStyle = {
        textAlign: 'left',
        padding : '5px'
    }

    headerAccentButtonStyle = {
        float : 'right',
        margin : '5px',
        background : '#8C8AFF',
        color : 'black'
    }

    headerButtonStyle = {
        float : 'right',
        margin : '5px',
    }

    backgroundStyle = {
        background: '#f9f9f9',
        padding : '20px'
    }

    containerStyle = {
        background: '#f9f9f9',
        padding: '5px'
    }

    render() {
        const {title, summary} = this.state;
        const { editorState } = this.state;

        return(
            <div style={this.backgroundStyle}>
                <div className={"container-fluid"} style={this.containerStyle}>
                    <div style={{'display': this.state.showSuccess ? 'block' : 'none'}}>
                        <Toast1
                            children={{
                                show: this.state.showSuccess,
                                message: "Article created successfully",
                                type: 'success'
                            }}
                        />
                    </div>
                    <div style={{'display': this.state.showFailure ? 'block' : 'none'}}>
                        <Toast2
                            children={{
                                show: this.state.showFailure,
                                message: "Error when creating the article",
                                type: 'danger'
                            }}
                        />
                    </div>
                    <Form onSubmit={this.submitArticleToRemote} onReset={this.resetForm}>
                        <Card className={'bg-transparent'}>
                            <Card.Header className={'bg-transparent text-white'}>
                                <Button style={this.headerAccentButtonStyle} variant={'custom'}  type={'submit'} className={'btn'}>Create</Button>
                                <Button style={this.headerButtonStyle} variant={'outline-secondary'} type={'reset'} className={'btn btn-outline-secondary'}>Discard</Button>
                            </Card.Header>
                            <br/>
                            <Card.Body>
                                <Form.Group as={Col} className={'mb-3'}>
                                    <div style={this.labelStyle}>
                                        <Form.Label>Title</Form.Label>
                                    </div>

                                    <Form.Control
                                        required={true}
                                        type={'text'}
                                        placeholder={'Enter title'}
                                        name={'title'}
                                        value={title}
                                        onChange={this.onChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <div style={this.labelStyle}>
                                        <Form.Label>Summary</Form.Label>
                                    </div>
                                    <Form.Control
                                        as="textarea"
                                        rows = {13}
                                        name={'summary'}
                                        value={summary}
                                        onChange={this.onChange}
                                    />
                                </Form.Group>


                            </Card.Body>



                            <Card.Footer>
                                <Form.Group>
                                    <div style={this.labelStyle}>
                                        <Form.Label>Content</Form.Label>
                                    </div>
                                    <Editor
                                        editorState={editorState}
                                        wrapperClassName="rich-editor demo-wrapper"
                                        editorClassName="demo-editor"
                                        onEditorStateChange={this.onEditorStateChange}
                                        placeholder="Type the content here" />
                                </Form.Group>

                            </Card.Footer>
                        </Card>




                    </Form>
                </div>
            </div>


        );
    }

}

export default CheckAuth(CreateArticle);