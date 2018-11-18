// 사용자 액션
import * as PostTypes from '../types/postTypes';

export const fetchPostList = (payload) => ({
  type: PostTypes.GET_POST,
  payload
});

// saga에서 호출하는 액션
export const fetchPostListSuccess= (post) => ({
  type: PostTypes.GET_POST_SUCCESS,
  payload: post
});

// saga에서 호출하는 액션
export const fetchPostListFailure = (error) => ({
  type: PostTypes.GET_POST_FAILURE,
  error
});