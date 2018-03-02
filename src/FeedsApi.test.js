import React from 'react';
import ReactDOM from 'react-dom';
import { RATE_POST_API, updatePost } from './FeedsAPI'

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });


const nullAction = { type: 'none' }

describe('Rate posts', () => {

  const postId = '8xf0y6ziyjabvozdd253nd';
  

  it('should return something', () => {
    // RATE_POST_API(postId).then(ans => console.log(ans))
  })


})

updatePost(post).then(res => console.log(res))


describe('Update Post', () => {
  const postId = '8xf0y6ziyjabvozdd253nd';
  const title = 'Hell', body = 'world!'
  
  const post = {
    id: postId,
    title,
    body
  }

  it('should update post', () => {
  })

})