import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { postsByID, commentsByPost } from './reducers/reducers';
import { DISPATCH_COMMENT_VOTE } from './actions/actions'

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

// const state = {
//   postsByCategory: {
//     all: {
//       isFetching: false,
//       didInvalidate: false,
//       items: [
//         '8xf0y6ziyjabvozdd253nd',
//         '6ni6ok3ym7mf1p33lnez',
//         '3435d4b0-511e-4a10-b61e-0123a8a0a16c'
//       ],
//       lastUpdated: 1519403219446
//     },
//     react: {
//       isFetching: false,
//       didInvalidate: true,
//       items: []
//     }
//   },
//   selectedCategory: 'all',
//   categories: {
//     byName: {
//       all: {
//         name: 'all',
//         path: ''
//       },
//       react: {
//         name: 'react',
//         path: 'react'
//       },
//       redux: {
//         name: 'redux',
//         path: 'redux'
//       },
//       udacity: {
//         name: 'udacity',
//         path: 'udacity'
//       }
//     },
//     allCategories: [
//       'all',
//       'react',
//       'redux',
//       'udacity'
//     ]
//   },
//   postsByID: {
//     '8xf0y6ziyjabvozdd253nd': {
//       id: '8xf0y6ziyjabvozdd253nd',
//       timestamp: 1467166872634,
//       title: 'Udacity is the best place to learn React',
//       body: 'Everyone says so after all.',
//       author: 'thingtwo',
//       category: 'react',
//       voteScore: 6,
//       deleted: false,
//       commentCount: 2
//     },
//     '6ni6ok3ym7mf1p33lnez': {
//       id: '6ni6ok3ym7mf1p33lnez',
//       timestamp: 1468479767190,
//       title: 'Learn Redux in 10 minutes!',
//       body: 'Just kidding. It takes more than 10 minutes to learn technology.',
//       author: 'thingone',
//       category: 'redux',
//       voteScore: -5,
//       deleted: false,
//       commentCount: 0
//     },
//     '3435d4b0-511e-4a10-b61e-0123a8a0a16c': {
//       id: '3435d4b0-511e-4a10-b61e-0123a8a0a16c',
//       timestamp: 1519403219426,
//       title: '1',
//       body: '1',
//       author: 'MIKE',
//       category: 'react',
//       voteScore: 1,
//       deleted: false,
//       commentCount: 0
//     }
//   },
//   commentsByPost: {},
//   sorter: {}
// }

// const nullAction = { type: 'none' }

// describe('PostsByID', () => {
  
//   const deleteAction = {
//     type: 'DELETE_POST',
//     post: {
//       id: '3435d4b0-511e-4a10-b61e-0123a8a0a16c'
//     }
//   }

//   const postsByIDStore  = state.postsByID

//   const sortedKeys = (state) => Object.keys(state).sort()

//   it('should return state', () => {
//     expect(postsByID(state, nullAction)).toEqual(state)
//   })

//   it('should contain 3 posts by default', () => {
//     expect(sortedKeys(postsByIDStore)).toEqual(
//       ['8xf0y6ziyjabvozdd253nd', '6ni6ok3ym7mf1p33lnez', '3435d4b0-511e-4a10-b61e-0123a8a0a16c'].sort()
//     )
//   })

//   it('should delete posts', () => {
//     expect(sortedKeys(postsByID(postsByIDStore, deleteAction))).toEqual(
//       ['8xf0y6ziyjabvozdd253nd', '6ni6ok3ym7mf1p33lnez'].sort()
//     )
//   })


// })

var testStore = {
  postsByCategory: {
    all: {
      isFetching: false,
      didInvalidate: false,
      items: [
        '8xf0y6ziyjabvozdd253nd',
        '6ni6ok3ym7mf1p33lnez'
      ],
      lastUpdated: 1520024937511
    }
  },
  selectedCategory: '',
  categories: {
    byName: {
      all: {
        name: 'all',
        path: ''
      },
      react: {
        name: 'react',
        path: 'react'
      },
      redux: {
        name: 'redux',
        path: 'redux'
      },
      udacity: {
        name: 'udacity',
        path: 'udacity'
      }
    },
    allCategories: [
      'all',
      'react',
      'redux',
      'udacity'
    ]
  },
  postsByID: {
    '8xf0y6ziyjabvozdd253nd': {
      id: '8xf0y6ziyjabvozdd253nd',
      timestamp: 1467166872634,
      title: 'Udacity is the best place to learn React',
      body: 'Everyone says so after all.',
      author: 'thingtwo',
      category: 'react',
      voteScore: 6,
      deleted: false,
      commentCount: 2
    },
    '6ni6ok3ym7mf1p33lnez': {
      id: '6ni6ok3ym7mf1p33lnez',
      timestamp: 1468479767190,
      title: 'Learn Redux in 10 minutes!',
      body: 'Just kidding. It takes more than 10 minutes to learn technology.',
      author: 'thingone',
      category: 'redux',
      voteScore: -5,
      deleted: false,
      commentCount: 0
    }
  },
  commentsByPost: {
    '8xf0y6ziyjabvozdd253nd': [
      {
        id: '894tuq4ut84ut8v4t8wun89g',
        parentId: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1468166872634,
        body: 'Hi there! I am a COMMENT.',
        author: 'thingtwo',
        voteScore: 6,
        deleted: false,
        parentDeleted: false
      },
      {
        id: '8tu4bsun805n8un48ve89',
        parentId: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1469479767190,
        body: 'Comments. Are. Cool.',
        author: 'thingone',
        voteScore: -5,
        deleted: false,
        parentDeleted: false
      }
    ]
  },
  sorter: {}
}



describe('comments by post', () => {
  const commentAction = {
    type: DISPATCH_COMMENT_VOTE,
    comment: {
      id: '8tu4bsun805n8un48ve89',
      parentId: '8xf0y6ziyjabvozdd253nd',
      voteScore: 10
    }
  }

  it('should update comment votecount', () => {
    expect(commentsByPost(testStore.commentsByPost, commentAction)['8tu4bsun805n8un48ve89'].voteScore).to.be(10)
  })


})