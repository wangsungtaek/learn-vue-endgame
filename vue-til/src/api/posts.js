import { posts } from './index';

// 학습 노트 데이터 조회 API
function fetchPosts() {
  return posts.get('/');
}
// 특정 학습 노트를 조회 API
function fetchPost(postId) {
  return posts.get(postId);
}

// 학습 노트 생성
function createPosts(postData) {
  return posts.post('/', postData);
}

// 학습 노트 삭제
function deletePosts(postId) {
  return posts.delete(postId);
}

// 학습 노트 수정
function editPosts(postId, postData) {
  return posts.put(postId, postData);
}

export { fetchPosts, createPosts, deletePosts, fetchPost, editPosts };
