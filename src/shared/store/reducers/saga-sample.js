// redux-saga
import { handleActions } from 'redux-actions';
import { SAGA_TYPES } from '../../sagas/saga';

const initialState = {
  userId: '',
  id: '',
  title: '',
  body: '',
  number: 1,
  latency: 1
};

export default handleActions({
  [`${SAGA_TYPES.GET_POST}_SUCCESS`]: (state, action) => {
    // const { title, body } = action.payload;
    return {
      ...state,
      ...action.payload
    }
  },
  [`${SAGA_TYPES.GET_POST}_FAILURE`]: (state, action) => {
    // const { title, body } = action.payload;
    return {
      ...state
    }
  },
  [`${SAGA_TYPES.INCREMENT_FROM_Q}`]: (state, action) => {
    const { payload: count } = action;
    return {
      ...state,
      number: state.number + count
    }
  },
  // [`${DISPATCH}`]: (state) => {
  //   return {
  //     ...state,
  //     latency: state.latency + 1
  //   }
  // }
}, initialState);