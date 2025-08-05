
export const BASE_URL = 'http://localhost:4000/api';
// export const BASE_URL = 'https://social-app-taupe-one.vercel.app/api';
// export const BASE_URL = 'https://social-app-backend-one.vercel.app/api';

export const Endpoints = {
  profileData: '/user/data',
  updateProfile: '/user/update',
  userPosts: '/post/allPosts',
  userPostsByEmail: (email) => `/post/postsbyemail/${email}`,
  profileDataByEmail:(email)=>`/user/userbyemail/${email}`,
  getPosts:(page)=>`/post/allUsersPosts?page=${page}&limit=10`,
  commentOnPost: (expandedPostUserId, expandedPostId)=> `/post/comment/${expandedPostUserId}/${expandedPostId}`,
  likeOnPost: (likePostUserId, likePostId)=> `/post/like-post/${likePostUserId}/${likePostId}`,
  createPost: '/post/createPost',

  BOT : {
    addChat: (selectedChatId) => `/bot/addChat/${selectedChatId}`,
    createChat:`/bot/createChat`,
    getChats  : `/bot/chats`,
    deleteChat: `/bot/deleteChat`,
  }
};