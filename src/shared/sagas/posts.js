import { call, spawn, put, takeEvery } from "redux-saga/effects"
import * as Actions from '../actions/postActions'
import * as PostTypes from '../types/postTypes';
import { findPostById } from '../api/postsAPI';

// Watcher
function* watchBoard() {
  // type의 action이 실행되면 fetchBoardsSaga도 항상(Every) 실행한다
  yield takeEvery(PostTypes.GET_POST, fetchPostData)
}

// Worker
function* fetchPostData(action = {}) {
  const { payload: postId } = action;
  try {
    const { data } = yield call(() => findPostById(postId));
    yield put(Actions.fetchPostListSuccess(data));

  } catch (error) {
    yield put(Actions.fetchPostListFailure(error));
  }
}

// Registration
export default function* rootSaga() {
  yield spawn(watchBoard)
}

// xport default function* rootSaga() {
//   yield all([
//     watchIncrement(),
//     watchFetchPostData()
//   ])
// }
