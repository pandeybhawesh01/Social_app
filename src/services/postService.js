import apiClient from "../api/apiClient";
import { Endpoints } from "../constants/Endpoints";

export const postService = {
    getAllPosts: async () => {
        const res = apiClient.get(Endpoints.getPosts);
        return res;
    },
    commentOnPost: async (expandedPostUserId, expandedPostId, comment) => {
        return apiClient.post(
            Endpoints.commentOnPost(expandedPostUserId, expandedPostId),
            { comment }
        );
    },
    likeOnPost: async (likePostUserId, likePostId) => {
        return apiClient.post(
            Endpoints.likeOnPost(likePostUserId, likePostId),
        );
    },
    createPost: async(content) => {
        return apiClient.post(
            Endpoints.createPost, content
        );
    }
};
