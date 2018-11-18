// redux-saga
import { handleActions } from 'redux-actions';
import * as PostTypes from '../../types/postTypes';

const initialState = {
  userId: '',
  id: '',
  title: '',
  body: '',
  number: 1,
  latency: 1
};

export default handleActions({
  [`${PostTypes.GET_POST}_SUCCESS`]: (state, action) => {
    // const { title, body } = action.payload;
    return {
      ...state,
      ...action.payload
    }
  },
  [`${PostTypes.GET_POST}_FAILURE`]: (state) => {
    // const { title, body } = action.payload;
    return {
      ...state
    }
  }
}, initialState);