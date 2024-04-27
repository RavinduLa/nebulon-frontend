/*
* @Author = A.M.W.W.R.L. Wataketiya (MS2346644)
* Component to view detail view for reader
* */
import {Component, useEffect, useState} from "react";
import {Card, CardText, CardTitle} from "react-bootstrap";
import {useParams, useSearchParams} from "react-router-dom";
import ArticleService from "../../services/ArticleService";
import data from "bootstrap/js/src/dom/data";


/*
class ArticleDetailReaderView extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.id = props.id;
    }

    initialState = {
        id: '',
        title: '',
        content: '',
        summary: '',
        authorId: '',
        createdDateTime: '',
        publishedDateTime: '',
    }

    componentDidMount() {
        //let id = this.props.match.params.id;
        console.log('Received id', this.state.id);
        //this.setState({id: id});
    }

    render() {
        return( <div>
            <div className={'container'}>
                <h1>{this.state.id}</h1>
                <CardText>Article Detail Reader View</CardText>
            </div>

        </div>
        );
    }

}
*/


const ArticleDetailReaderView = (Component) => {
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

    useEffect(() => {
        console.log(params.id);
        ArticleService.getArticleById(params.id)
            .then(response => response.data)
            .then((data) => {
                setArticle(data);
            }).catch(error => {
            console.log("Error in getting article");
        })

    }, []);

    const getDateString = (receivedDateString) => {
        var date = new Date(receivedDateString);
        //Pad with 0s
        const dateString = date.getFullYear() + "-" +  ("0" + (date.getMonth() + 1)).slice(-2) + "-" + + ("0" + date.getDate()).slice(-2)  +
            " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        console.log("DateString : " + dateString);
        return dateString;
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

    return( <div>
            <div className={'container'}>
                <Card>
                    <Card.Header>
                        <CardTitle>{article.title}</CardTitle>
                        <CardText>By {article.authorId}</CardText>
                    </Card.Header>
                    <Card.Body>
                        <CardText style={contentStyle} >{article.summary}</CardText>
                        <CardText style={contentStyle}  dangerouslySetInnerHTML={{__html: article.content}} />
                    </Card.Body>
                    <Card.Footer>
                        <CardText>Published on {getDateString(article.publishedDateTime)}</CardText>
                    </Card.Footer>
                </Card>
                <br/>
            </div>

        </div>
    );
}

export default ArticleDetailReaderView;