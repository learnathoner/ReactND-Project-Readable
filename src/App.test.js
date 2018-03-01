import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { postsByID } from './reducers/reducers';

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