import express from 'express'
import userAuth from '../middleware/userAuth.js'
import { getPosts,createPost, deletePost, updatePost, createLike, createComment, getAllPosts } from '../controllers/postController.js';

const postRouter= express.Router();

postRouter.get('/allPosts',userAuth,getPosts);
postRouter.post('/createPost',userAuth,createPost);
postRouter.delete("/delete-post/:postId", userAuth, deletePost);
postRouter.put("/update-post/:postId", userAuth, updatePost);
postRouter.post("/like-post/:userId/:userPostsId",userAuth,createLike);
postRouter.post("/comment/:userPostsId/:postId", userAuth, createComment);
postRouter.post("/allUsersPosts", userAuth, getAllPosts);


export default postRouter;