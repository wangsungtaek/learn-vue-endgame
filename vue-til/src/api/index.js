import axios from 'axios';
import { setInterceptors } from './common/interceptors';

// API 초기화
function creaeInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
  return setInterceptors(instance);
}

const instance = creaeInstance();

// 회원가입 API
function registerUser(userData) {
  return instance.post('signup', userData);
}

// 로그인 API
function loginUser(userData) {
  return instance.post('login', userData);
}

// 학습 노트 데이터 조회 API
function fetchPosts() {
  return instance.get('posts');
}

export { registerUser, loginUser, fetchPosts };
