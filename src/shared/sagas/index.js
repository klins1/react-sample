import { all } from 'redux-saga/effects'
import posts from './posts'
import saga from './saga'

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    saga(),
    posts()
  ])
}