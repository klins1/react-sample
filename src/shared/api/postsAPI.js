import axios from 'axios';

export const findPosts = () => {
  return axios.get(`https://jsonplaceholder.typicode.com/posts`)
};

export const findPostById = (postId) => {
  return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
};

export const findPostsByUserId = (userId) => {
  return axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
};

export const createPost = (post) => {
  return axios.post(`https://jsonplaceholder.typicode.com/posts?userId`, post, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });
};