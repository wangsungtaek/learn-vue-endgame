import { posts } from './index';

// 학습 노트 데이터 조회 API
function fetchPosts() {
  return posts.get('/');
}

// 학습 노트 생성
function createPosts(postData) {
  return posts.post('/', postData);
}

// 학습 노트 삭제
function deletePosts(postId) {
  return posts.delete(postId);
}

export { fetchPosts, createPosts, deletePosts };
