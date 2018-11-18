// redux-saga
import axios from 'axios';
import { createAction, handleActions } from 'redux-actions';

import { delay } from 'redux-saga'
import { all, call, put, takeEvery } from 'redux-saga/effects';

const GET_POST = 'lcm/saga/GET_POST';
const GET_POST_PENDING = 'lcm/saga/GET_POST_PENDING';
const GET_POST_SUCCESS = 'lcm/saga/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'lcm/saga/GET_POST_FAILURE';

const INCREMENT = 'lcm/saga/INCREMENT';
const INCREMENT_FROM_Q = 'lcm/saga/INCREMENT_FROM_Q';

export const SAGA_TYPES = {
  GET_POST,
  GET_POST_PENDING,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  INCREMENT,
  INCREMENT_FROM_Q
};

const getPostAPI = (postId) => {
  return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
};

// worker Saga: will be fired on INCREMENT actions
// export function incrementAsync() {
//   return {
//     type: INCREMENT
//   }
// }

export const increment = createAction(INCREMENT);
export const fetchData = createAction(GET_POST);

// worker Saga: will be fired on INCREMENT actions
function* watchIncrement() {
  yield takeEvery(INCREMENT, afterIncrement)
}

function* afterIncrement(action = {}) {
  yield delay(1000);
  yield put({ type: INCREMENT_FROM_Q, payload: action.payload });
}

function* watchFetchPostData() {
  yield takeEvery(GET_POST, fetchPostData)
}

function* fetchPostData(action = {}) {
  const { payload: postId } = action;
  const { data } = yield call(() => getPostAPI(postId));

  yield put({
    type: `${SAGA_TYPES.GET_POST}_SUCCESS`,
    payload: data
  });
}

export default function* rootSaga() {
  yield all([
    watchIncrement(),
    watchFetchPostData()
  ])
}
