/*
* @Author = A.M.W.W.R.L. Wataketiya (MS2346644)
* Component to view previews of articles of the current author
* */

import {Component, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import CheckAuth from "../../services/CheckAuth";
import ArticleService from "../../services/ArticleService";
import {Card, CardText, CardTitle} from "react-bootstrap";


const ArticleDetailAuthorPreview = (Component) => {
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
                    </Card.Header>
                    <Card.Body>
                        <CardText style={contentStyle} >{article.summary}</CardText>
                        <CardText style={contentStyle}  dangerouslySetInnerHTML={{__html: article.content}} />
                    </Card.Body>
                    <Card.Footer>
                        <CardText>Published on {article.publishedDateTime}</CardText>
                    </Card.Footer>
                </Card>
                <br/>
            </div>

        </div>
    );
}

export default CheckAuth(ArticleDetailAuthorPreview);