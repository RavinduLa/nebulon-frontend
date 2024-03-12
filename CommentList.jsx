import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get('/comments')
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, []);

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <p>{comment.content}</p>
            <button onClick={() => handleLike(comment.id)}>Like</button>
            <button onClick={() => handleDislike(comment.id)}>Dislike</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
