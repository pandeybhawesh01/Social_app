import { useState } from "react";
import { postService } from "../services/postService";

const usePostViewModel = () => {
    const [loading, setLoading] = useState(false);
    const [comloading, setComLoading] = useState(false);
    const [error, setError] = useState(null);

    const getDashboardPost = async ({page,setPosts,setHasMore}) => {
        setLoading(true);
        setError(null);
        try {
            const res = await postService.getAllPosts(page);
            console.log(page);
            if(res.data.success)
            {
                setPosts(prev=>([...prev,...res.data.posts]))
                setHasMore(res.data.hasMore)
                return res.data;
            }
            else{
                throw new Error(res.data.message);
            }
        }
        catch (err) {
            setError(
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                'Failed to load profile'
            );
        }
        finally{
            setLoading(false);
        }
    }
    const postComment = async (expandedPostUserId, expandedPostId, comment) => {
        setComLoading(true);
        setError(null);
        try {
            const res = await postService.commentOnPost(expandedPostUserId, expandedPostId, comment)
            if (!res.data.success) throw new Error(res.data.message);
            return res.data;
        } catch (err) {
             setError(
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                'Failed to load profile'
            );
        }
        finally{
            setComLoading(false);
        }
    }
    const likePost = async (likePostUserId, likePostId) => {
       
        setError(null);
        try {
            const res = await postService.likeOnPost(likePostUserId, likePostId)
            console.log("res in view model",res);
            if (!res.data.success) throw new Error(res.data.message);
            return res.data;
        } catch (err) {
            console.log("error in view model ", err);
            setError(
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                'Failed to load profile'
            );
        }
    }
    const createPost = async (content) => {
        setLoading(true);
        setError(null);
        try{
            const res = await postService.createPost(content);
            console.log(res, 'res in view model to create post');
            if(res.data.success) return res.data;
            throw new Error(res.data.message);
        }
        catch(err){
            console.log("error in view model ", err);
            setError(
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                'Failed to load profile'
            );
        }
        finally{
            setLoading(false);
        }
    }
    return {
        loading,
        error,
        getDashboardPost,
        postComment,
        likePost,
        createPost,
        comloading,
    }
} 
export default usePostViewModel;