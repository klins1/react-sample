// redux-promise-middleware

import axios from 'axios';
import { createAction, handleActions } from 'redux-actions';

const GET_POST = 'lcm/counter/GET_POST';
const GET_POST_PENDING = 'lcm/counter/GET_POST_PENDING';
const GET_POST_SUCCESS = 'lcm/counter/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'lcm/counter/GET_POST_FAILURE';

const INCREMENT = 'lcm/counter/INCREMENT';

const getPostAPI = (postId) => {
  return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
};

export const getPost = (postId) => ({
  type: GET_POST,
  // redux-promise-middleware 때문에 가능함
  // create react action과 맞추는 형태? 그러한 듯!
  payload: getPostAPI(postId)
});

export const increment = createAction(INCREMENT);

// Error: Actions must be plain objects. Use custom middleware for async actions.
// tunk 미들웨어가 없는 경우 오류 발생함
export const dispatchAsync = () => dispatch => {
  setTimeout(() => {
    dispatch(increment())
  }, 2000);
};

const initialState = {
  userId: '',
  id: '',
  title: '',
  body: '',
  number: 1,
  latency: 1
};

export default handleActions({
  [`${GET_POST}_SUCCESS`]: (state, action) => {
    console.log('_SUCCESS >>>>>>>>>>>>>>>>', action);
    // const { title, body } = action.payload;
    return {
      ...state,
      ...action.payload.data
    }
  },
  [`${GET_POST}_FAILURE`]: (state, action) => {
    console.log('_FAILURE >>>>>>>>>>>>>>>>', action);
    // const { title, body } = action.payload;
    return {
      ...state
    }
  },
  [`${INCREMENT}`]: (state) => {
    return {
      ...state,
      number: state.number + 1
    }
  },
  // [`${DISPATCH}`]: (state) => {
  //   return {
  //     ...state,
  //     latency: state.latency + 1
  //   }
  // }
}, initialState);