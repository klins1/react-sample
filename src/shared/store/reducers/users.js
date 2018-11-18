// import { combineEpics, ofType } from 'redux-observable';
// import { switchMap, takeUntil, map, catchError } from 'rxjs/operators';
// import { ajax } from 'rxjs/observable/dom/ajax';

import { of, from } from 'rxjs';
import { ofType } from 'redux-observable';
import { map, switchMap, mergeMap, catchError, tap, startWith } from 'rxjs/operators';
// import { ajax } from 'rxjs/ajax';
// import { findPosts } from '../../api/postsAPI';
import handleActions from 'redux-actions/es/handleActions';
import { createAction } from 'redux-actions';
import axios from 'axios';

export const GET_USERS = 'lcm/users/GET_USERS';
export const GET_USERS_PENDING = 'lcm/users/GET_USERS_PENDING';
export const GET_USERS_SUCCESS = 'lcm/users/GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'lcm/users/GET_USERS_FAILURE';

export const getUsers = createAction(GET_USERS);
export const getUsersSuccess = createAction(GET_USERS_SUCCESS);
export const getUsersPending = createAction(GET_USERS_PENDING);
export const getUsersFailure = createAction(GET_USERS_FAILURE);

// 사실 Epic의 두번째 파라미터로는 Redux 스토어가 들어옵니다.
// 따라서 필요할 때 getState()를 호출하여 스토어 상태에 따라 액션을 처리할 수 있습니다.
export const epic = (action$, store) =>
  action$.pipe(
    ofType(GET_USERS),
    // tap(() => of(getUsersPending())),
    mergeMap((action) =>
      // ajax({
      //   url: '/end-points',
      // })
      from(axios.get('https://jsonplaceholder.typicode.com/users')).pipe(
        map(res => getUsersSuccess(res && res.data)),
        // 성공인 경우에만 걸림
        tap(() => {
          // 출구 전략/탈출
          console.log('%c>> action', 'color: yellow', action);
        }),
        // RxJS의 takeUntil 연산자를 적용하면 특정 액션이 들어올 때 동작을 취소할 수 있습니다.
        // takeUntil(actions.ofType('FETCH_USER_ABORTED'))
        catchError((e) => {
          console.error('%c[ERROR]', 'color: yellow; font-weight:bold;', e);
          return of(getUsersFailure(e));
        }),
        startWith(getUsersPending())
      )
    )
  );

const initialState = {
  userId: '',
  id: '',
  userName: '',
  users: []
};

export default handleActions({
  [GET_USERS_SUCCESS]: (state, action) => {
    // const { title, body } = action.payload;
    return {
      ...state,
      users: action.payload
    };
  },
  [GET_USERS_PENDING]: (state) => {
    // const { title, body } = action.payload;
    return {
      ...state
    };
  },
  [GET_USERS_FAILURE]: (state, action) => {
    const { payload: {message, stack}, error } = action;
    return {
      ...state,
      error,
      message,
      stack
    };
  }
}, initialState);