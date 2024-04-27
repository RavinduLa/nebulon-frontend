/*
* @Author = A.M.W.W.R.L. Wataketiya (MS2346644)
* Component to edit an existing article
* */
import {Component, useEffect, useState} from "react";
import CheckAuth from "../../services/CheckAuth";
import {useParams} from "react-router-dom";
import ArticleService from "../../services/ArticleService";
import Toast1 from "../../components/toasts/Toast1";
import Toast2 from "../../components/toasts/Toast2";
import {Button, Card, CardText, CardTitle, Col, Form} from "react-bootstrap";
import {Editor} from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {convertToRaw, EditorState, Modifier} from "draft-js";
import {stateFromHTML} from 'draft-js-import-html';
import data from "bootstrap/js/src/dom/data";


const getHtml = editorState =>   draftToHtml(convertToRaw(editorState.getCurrentContent()));
const EditArticle = (Component) => {
    const params = useParams();
    const [article, setArticle] = useState(
        {
            title: 'initial title',
            content: 'initial content',
            summary: 'initial Summary',
            authorId: 'initial Author ID',
            createdDateTime: 'initial Created Date time',
            publishedDateTime: 'initial Published Date time',
        }
    );
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [summary, setSummary] = useState('');
    const [initialContent, setInitialContent] = useState('');
    const [isPublished, setIsPublished] = useState(false);
    const [publishedDateTimeString, setPublishedDateTimeString] = useState('');
    const [createdDateTimeString, setCreatedDateTimeString] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    /*const [editorState, setEditorState] = useState( () => {
        if(content) {
            let contentState = stateFromHTML(content);
            return EditorState.createWithContent(contentState);
        }
        return EditorState.createEmpty();
    } );
    */
    let editor;

    useEffect(()  => {
        console.log(params.id);
        ArticleService.getArticleById(params.id)
            .then(response => response.data)
            .then((data) => {
                setArticle(data);
                setTitle(data.title);
                setSummary(data.summary);
                setContent(data.content);
                setInitialContent(data.content);
                setIsPublished(data.published);
                setPublishedDateTimeString( getDateString(data.publishedDateTime));
                setCreatedDateTimeString( getDateString(data.createdDateTime));

                console.log();


                //focusEditor();
                //setEditorState(insertTextToEditor(content, editorState));
            })
            .then(() => {
                //let contentState = stateFromHTML(content);
                //setEditorState(EditorState.createWithContent(contentState));
            })
            .catch(error => {
            console.log("Error in getting article");
            console.log("Error ", error);
        })

    }, []);


    useEffect( () => {
        let contentState = stateFromHTML(content);
        setEditorState(EditorState.createWithContent(contentState));
    }, [initialContent] );

    const updateEditorInnerContent = () => {
        let contentState = stateFromHTML(content);
        setEditorState(EditorState.createWithContent(contentState));
    }

    const publishArticle = () => {
        ArticleService.publishArticle(article.id)
            .then(response => response.data)
            .then( (data) => {
                setIsPublished(data.published);
                setPublishedDateTimeString(getDateString(data.publishedDateTime));
                showSuccessToast();
            })
            .catch(error => {
                console.log("Error in publishing article");
                console.log("Error ", error);
                showFailureToast();
            })
    }

    const showSuccessToast = () => {
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false),3000);
    }

    const showFailureToast = () => {
        setShowFailure(true)
        setTimeout(() => setShowFailure(false),3000);
    }

    const unPublishArticle = () => {
        ArticleService.unPublishArticle(article.id)
            .then(response => response.data)
            .then( (data) => {
                setIsPublished(data.published);
                showSuccessToast();
            })
            .catch(error => {
                console.log("Error in un-publishing article");
                console.log("Error ", error);
                showFailureToast();
            })
    }

    /*
    const insertTextToEditor = (text, inMethodEditorState) => {
        const currentContent = inMethodEditorState.getCurrentContent(),
            currentSelection = inMethodEditorState.getSelection();

        const newContent = Modifier.replaceText(
            currentContent,
            currentSelection,
            text
        );

        const newEditorState = EditorState.push(inMethodEditorState, newContent, 'insert-characters');
        //return EditorState.forceSelection(newEditorState, newContent.getSelectionAfter()  );
        return newEditorState;
    }
    */

    /* const focusEditor = () => {
        if(editor) {
            editor.focusEditor();
            console.log("1. Editor has the focus now");
        }
    } */

    const submitChangesToRemote = async (event) => {
        event.preventDefault();
        if (title !== '') {
            let article = {
                id: params.id,
                title: title,
                content: content,
                summary: summary
            }

            await ArticleService.updateArticle(article).then((data) => {
                if(data != null){
                    console.log('Updated article');
                    setArticle(data);
                    setTitle(data.title);
                    setSummary(data.summary);
                    setContent(data.content);
                    setPublishedDateTimeString(getDateString(data.publishedDateTime));
                    setCreatedDateTimeString(getDateString(data.createdDateTime));

                    setShowSuccess(true)
                    setTimeout(() => setShowSuccess(false),3000);
                }
            }).catch(error => {
                console.log('Error in updating the article. Error: ', error);
                setShowFailure(true)
                setTimeout(() => setShowFailure(false),3000);
            });
        } else  {
            console.log('Article title is empty');
        }
    }

    const resetForm = () => {
        setTitle(article.title);
        setContent(article.content);
        setSummary(article.summary);
        setInitialContent(article.content);
        updateEditorInnerContent();
    }

    const onEditorStateChange = (editorState) => {
        //this.setState({ editorState });
        //this.setState({content: getHtml(this.state.editorState)});

        setEditorState(editorState);
        setContent(getHtml(editorState));
    }

    const getDateString = (receivedDateString) => {
        var date = new Date(receivedDateString);
        //Pad with 0s
        const dateString = date.getFullYear() + "-" +  ("0" + (date.getMonth() + 1)).slice(-2) + "-" + + ("0" + date.getDate()).slice(-2)  +
             " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        console.log("DateString : " + dateString);
        return dateString;
    }

    const setEditor = (inEditor) => {
        editor = inEditor;
    }

    const headerStyle = {
        float : 'left',
        textAlign: 'left',
    }

    const dateTimeStyle = {
        float : 'left',
        textAlign: 'left',
    }

    const contentStyle = {
        float : 'left',
        textAlign: 'left',
        maxWidth: '100%'
    }

    const backgroundStyle = {
        background: '#f9f9f9',
        padding : '20px'
    }

    const containerStyle = {
        background: '#f9f9f9',
        padding: '5px',
        float : 'left',
        textAlign: 'left',
    }

    const labelStyle = {
        textAlign: 'left',
        padding : '5px'
    }

    const createdDateLabelStyle = {
        textAlign: 'left',
    }

    const headerAccentButtonStyle = {
        float : 'right',
        margin : '5px',
        background : '#8C8AFF',
        color : 'black'
    }

    const publishButtonStyle = {
        float : 'left',
        margin : '5px',
        background : '#8C8AFF',
        color : 'black'
    }

    const unPublishButtonStyle = {
        float : 'left',
        margin : '5px',

    }

    const headerButtonStyle = {
        float : 'right',
        margin : '5px',
    }

    return(
        <div style={backgroundStyle}>
            <div className={'container-fluid'} style={containerStyle}>
                <div style={{'display': showSuccess ? 'block' : 'none'}}>
                    <Toast1
                        children={{
                            show: showSuccess,
                            message: "Article updated successfully",
                            type: 'success'
                        }}
                    />
                </div>
                <div style={{'display': showFailure ? 'block' : 'none'}}>
                    <Toast2
                        children={{
                            show: showFailure,
                            message: "Error when updating the article",
                            type: 'danger'
                        }}
                    />
                </div>
                <Form onSubmit={submitChangesToRemote} onReset={resetForm}>
                    <Card className={'bg-transparent'}>
                        <Card.Header className={'bg-transparent text-white'}>
                            {
                                isPublished ?
                                    <Button style={unPublishButtonStyle} variant={'outline-secondary'} onClick={unPublishArticle}>Unpublish</Button> :
                                    <Button style={publishButtonStyle} variant={'custom'} onClick={publishArticle}>Publish</Button>
                            }

                            <Button style={headerAccentButtonStyle} variant={'custom'}  type={'submit'} className={'btn'}>Update</Button>
                            <Button style={headerButtonStyle} variant={'outline-secondary'} type={'reset'} className={'btn btn-outline-secondary'}>Discard</Button>
                        </Card.Header>
                        <br/>
                        <Card.Body>
                            <Form.Group as={Col} className={'mb-3'}>
                                <div style={labelStyle}>
                                    <Form.Label>Title</Form.Label>
                                </div>

                                <Form.Control
                                    required={true}
                                    type={'text'}
                                    placeholder={'Enter title'}
                                    name={'title'}
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group as={Col} className={'mb-3'}>
                                <div style={createdDateLabelStyle}>
                                    <Form.Label>Created on</Form.Label>
                                </div>
                                <Form.Text >{createdDateTimeString}</Form.Text>
                            </Form.Group>
                            <br/>
                            <Form.Group as={Col} className={'mb-3'}>
                                <div style={createdDateLabelStyle}>
                                    <Form.Label>Last published on (Will be the same as created day if never published)</Form.Label>
                                </div>
                                <Form.Text >{publishedDateTimeString}</Form.Text>
                            </Form.Group>

                            <br/>

                            <Form.Group as={Col} className={'mb-3'}>
                                <div style={labelStyle}>
                                    <Form.Label>Summary</Form.Label>
                                </div>
                                <Form.Control
                                    as="textarea"
                                    rows = {13}
                                    name={'summary'}
                                    value={summary}
                                    onChange={e => setSummary(e.target.value)}
                                />
                            </Form.Group>


                        </Card.Body>



                        <Card.Footer>
                            <Form.Group>
                                <div style={labelStyle}>
                                    <Form.Label>Content</Form.Label>
                                </div>
                                <Editor
                                    ref = {setEditor}
                                    editorState={editorState}
                                    wrapperClassName="rich-editor demo-wrapper"
                                    editorClassName="demo-editor"
                                    onEditorStateChange={onEditorStateChange}
                                    placeholder="Type the content here" />
                            </Form.Group>

                        </Card.Footer>
                    </Card>




                </Form>
            </div>

        </div>
    );

}

export default CheckAuth(EditArticle);