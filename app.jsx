import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import axios from 'axios';

const App = () => {
  const handleAddComment = (content) => {
    axios.post('/comments', { content })
      .then(response => {
        console.log('Comment added successfully:', response.data);
      })
      .catch(error => {
        console.error('Error adding comment:', error);
      });
  };

  return (
    <div>
      <h1>Comments Module</h1>
      <CommentList />
      <CommentForm onSubmit={handleAddComment} />
    </div>
  );
};

export default App;

