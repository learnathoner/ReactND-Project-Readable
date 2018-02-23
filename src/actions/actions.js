import { 
  getPosts, 
  getCats, 
  getCatPosts,
  getComments, 
  addComment,
  updatePost,
  DELETE_POST_API
} from "../FeedsAPI";

export const SELECT_CATEGORY = "SELECT_CATEGORY";

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  };
}

export const INVALIDATE_CATEGORY = "INVALIDATE_CATEGORY";

export function invalidateCategory(category) {
  return {
    type: INVALIDATE_CATEGORY,
    category
  };
}

export const REQUEST_POSTS = "REQUEST_POSTS";

export function requestPosts(category) {
  return {
    type: REQUEST_POSTS,
    category
  };
}

export const UPDATE_POST = "UPDATE_POST";

export function updatePostAction(post) {
  return {
    type: UPDATE_POST,
    post
  }
}

export const RECEIVE_POSTS = "RECIEVE_POSTS";

export function receivePosts(category, posts) {
  return {
    type: RECEIVE_POSTS,
    category,
    posts: posts,
    receivedAt: Date.now()
  };
}

// DELETE POST 
export const DELETE_POST = "DELETE_POST";

export function deletePostAction(id) {
  return {
    type: DELETE_POST,
    post: {
      id
    }
  }
}

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

export function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  };
}

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";

export function receiveComments(id, comments) {
  return {
    type: RECEIVE_COMMENTS,
    id,
    comments
  };
}

export const SET_SORT = "SET_SORT";

export function setSort(criteria, order) {
  return {
    type: SET_SORT,
    criteria,
    order
  }
}

// THUNK ACTION
// Fetches posts from API, changes state while requesting, changes again when found
// TODO: Add error handling

// DELETE POST THUNK HANDLER
// Sends DELETE_POST_API, then dispatches (deletePostAction)
export function deletePostThunk(id) {
  return function (dispatch) {
    return DELETE_POST_API(id)
      .then(() => dispatch(deletePostAction(id)))
  }
}

// FETCH POSTS
// Fetches all posts for home category, or fetches selected category
export function fetchPosts(category) {
  return function(dispatch) {
    dispatch(requestPosts(category));

    if (category === "all") {
      return getPosts(category).then(posts =>
        dispatch(receivePosts(category, posts))
      );
    }

    return getCatPosts(category).then(posts =>
      dispatch(receivePosts(category, posts))
    );
  };
}

// SHOULD FETCH POSTS
// Tells below function whether it needs to fetch posts
export function shouldFetchPosts(state, category) {
  const posts = state.postsByCategory[category];

  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

// FETCH POSTS IF NEEDED
// dispatches fetchPosts pending result of shouldFetchPosts
export function fetchPostsIfNeeded(category) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), category)) {
      return dispatch(fetchPosts(category));
    } else {
      return Promise.resolve();
    }
  };
}

// UPDATE POST THUNK HANDLER
// Sends call to API to update post, then updates post info in store
export function updatePostHandler(post) {
  return function(dispatch) {
    return updatePost(post)
      .then(() => {
        return dispatch(updatePostAction(post))
      })
  }
}

// Fetch Categories

export function fetchCategories() {
  return dispatch => {
    return getCats().then(categories =>
      dispatch(receiveCategories(categories))
    );
  };
}

/*
*
* COMMENTS
*
*/

// Fetch Comments

export function fetchComments(id) {
  return function(dispatch) {
    return getComments(id).then(comments =>
      dispatch(receiveComments(id, comments))
    );
  };
}

// Add comment

export const ADD_COMMENT = 'ADD_COMMENT'

export function addCommentAction(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }

}