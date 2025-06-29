import mongoose from "mongoose";

// Basic user info without sensitive data
const userInfoSchema = new mongoose.Schema({
    username: { type: String, required: true },
    profilePic: { type: String, default: "" },
    email: { type: String, required: true },
    college: { type: String, default: "" },
}, { _id: false });

// Comment schema
const commentSchema = new mongoose.Schema({
    user: userInfoSchema,
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { _id: false });

// Individual post schema
const singlePostSchema = new mongoose.Schema({
    image: { type: String },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    type:{ type: String, default: ""},
    college: { type: String, default: "" },
    likes: [userInfoSchema],
    comments: [commentSchema]
});

// Top-level per-user post schema
const postSchema = new mongoose.Schema({
    owner: {
        type: userInfoSchema,
        required: true,
        unique: true
    },
    posts: [singlePostSchema]
}, { timestamps: true });

const postModel = mongoose.models.userPosts || mongoose.model('userPosts', postSchema);

export default postModel;
