import { useState } from "react";
import { postService } from "../services/postService";

const usePostViewModel = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getDashboardPost = async ({page,setPosts,setHasMore,setPage}) => {
        setLoading(true);
        setError(null);
        try {
            const res = await postService.getAllPosts(page);
            if(res.data.success)
            {
                setPosts(prev=>([...prev,...res.data.posts]))
                
                setHasMore(res.data.hasMore)
                setPage(prev=>(prev+1))
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
        setLoading(true);
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
            setLoading(false);
        }
    }
    const likePost = async (likePostUserId, likePostId) => {
        setLoading(true);
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
    }
} 
export default usePostViewModel;