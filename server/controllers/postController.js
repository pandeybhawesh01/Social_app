import { uploadToCloudinary } from "../config/cloudinary.js";
import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";

export const getPosts = async (req, res) => {
    try {
        const { userId } = req;
        const user = await userModel.findById(userId)
        if (!user) {
            return res.json({ success: false, message: "user not found" });
        }
        const userPosts = await postModel.findOne({ "owner.email": user.email });

        if (!userPosts) {
            return res.json({ success: false, message: "you have no posts yet" });
        }
        return res.json({ success: true, data: userPosts })
    }
    catch (err) {
        return res.json({ success: false, message: err.message })
    }
}

export const createPost = async (req, res) => {
    try {
        const { userId } = req;
        const user = await userModel.findById(userId)
        if (!user.isAccountVerified) {
            return res.json({ success: false, message: "You need to get verified to create posts" })
        }
        const {content,college,type, image} = req.body;
        if (!user) {
            return res.json({ success: false, message: "user not found" })
        }
        // let imageUrl = ''

        // if (req.files && req.files.image) {
        //     const file = req.files.image;
        //     if (!file.mimetype || !file.mimetype.startsWith('image/')) {
        //         return res.json({ success: false, message: 'Please upload a valid image file (e.g., JPEG, PNG)' });
        //     }
        //     try {
        //         const result = await uploadToCloudinary(file.tempFilePath, {
        //             folder: 'Users',
        //         });
        //         imageUrl = result.url;
        //     }
        //     catch (uploadError) {
        //         return res.json({ success: false, message: uploadError });
        //     }

        // }
        const userInfo = { username: user.name, email: user.email, profilePic: user.image };
        const newPost = {
            image,
            content,
            college,
            type,
            createdAt: new Date(),
            likes: [],
            comments: []
        };

        console.log("new post is ",newPost)
        let post = await postModel.findOne({ "owner.email": user.email });
        if (!post) {
            post = await new postModel({
                owner: userInfo,
                posts: [newPost]
            })
        }
        else {
            post.posts.push(newPost);
        }
        await post.save();
        return res.status(201).json({ success: true, message: "Post added successfully" });
    }
    catch (err) {
        return res.json({ success: false, message: err.message })
    }
}
export const deletePost = async (req, res) => {
    try {
        const { userId } = req;
        const { postId } = req.params;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        const post = await postModel.findOne({ "owner.email": user.email });
        if (!post) {
            return res.json({ success: false, message: "No posts found for this user" });
        }
        const originalLength = post.posts.length;
        post.posts = post.posts.filter(currentPost => postId != currentPost._id.toString());
        if (post.posts.length === originalLength) {
            return res.json({ success: false, message: "Post not found" });
        }
        await post.save();
        return res.status(200).json({ success: true, message: "Post deleted successfully" });
    }
    catch (err) {
        return res.json({ success: false, message: err.message });
    }

}
export const updatePost = async (req, res) => {
    try {
        const { userId } = req;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        const { postId } = req.params;
        const userPosts = await postModel.findOne({ "owner.email": user.email });
        if (!userPosts) {
            return res.json({ success: false, message: "No Posts for this user" });
        }
        const post = userPosts.posts.find(p => p._id.toString() === postId);
        if (!post) {
            return res.json({ success: false, message: "Post not found" });
        }
        const { content,college,type } = req.body;
        if (content.length === 0) {
            return res.json({ success: false, message: "write the updated content" })
        }
        post.content = content;
        post.college=college;
        post.type=type;
         let imageUrl = ''

        if (req.files && req.files.image) {
            const file = req.files.image;
            if (!file.mimetype || !file.mimetype.startsWith('image/')) {
                return res.json({ success: false, message: 'Please upload a valid image file (e.g., JPEG, PNG)' });
            }
            try {
                const result = await uploadToCloudinary(file.tempFilePath, {
                    folder: 'Users',
                });
                imageUrl = result.url;
            }
            catch (uploadError) {
                return res.json({ success: false, message: uploadError });
            }

        }
        post.image=imageUrl;
        await userPosts.save();
        return res.status(200).json({ success: true, message: "Post updated successfully" });

    }
    catch (err) {
        return res.json({ success: false, message: err.message });
    }
}
export const createLike = async (req, res) => {
    try {
        const { userPostsId, postId } = req.params;
        const likeUserId = req.userId;
        const likeUser = await userModel.findById(likeUserId);
        const userPosts = await postModel.findById(userPostsId);
        if (!userPosts) {
            return res.json({ success: false, message: "User has no posts" });
        }
        const post = userPosts.posts.find(p => p._id.toString() === postId);
        if (!post) {
            return res.json({ success: false, message: "Post not found" });
        }
        const alreadyLiked = post.likes.some(l => l.email === likeUser.email);
        if (alreadyLiked) {
            return res.json({ success: false, message: "User already liked this post" });
        }

        const like = {
            username: likeUser.name,
            profilePic: likeUser.image,
            email: likeUser.email
        }
        post.likes.push(like);
        await userPosts.save();
        return res.json({ success: true, message: "post liked successfully" })
    }
    catch (err) {
        return res.json({ success: false, message: err.message })
    }
}
export const createComment = async (req, res) => {
    try {
        const { userPostsId, postId } = req.params;
        const commentUserId = req.userId;
        const { comment } = req.body;
        const commentUser = await userModel.findById(commentUserId);
        if (!commentUser) {
            return res.json({ success: false, message: "user not found" });
        }
        const userPosts = await postModel.findById(userPostsId);
        if (!userPosts) {
            return res.json({ success: false, message: "posts not found" });
        }
        const post = userPosts.posts.find(p => p._id.toString() === postId);
        if (!post) {
            return res.json({ success: false, message: "post not found" });
        }
        const commentbody = {
            user: {
                username: commentUser.name,
                profilePic: commentUser.image,
                email: commentUser.email
            },
            comment: comment,
            createdAt: new Date(),
        }
        post.comments.push(commentbody);
        await userPosts.save();
        return res.json({ success: true, message: "commented on post successfully" })
    }
    catch (err) {
        return res.json(err.message)
    }
}
export const getAllPosts = async (req, res) => {
  try {
    const { userId } = req;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
    const allPosts = await postModel.aggregate([
      { $unwind: "$posts" }, 
      {
        $project: {
          _id: "$_id",
          owner: "$owner",
          post: "$posts"
        }
      },
      { $sort: { "post.createdAt": -1 } } 
    ]);

    res.status(200).json({ success: true, posts: allPosts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};