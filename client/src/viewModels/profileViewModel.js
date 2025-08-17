// src/viewModels/useProfileViewModel.js
import { useState } from 'react';
import { profileService } from '../services/profileService';
const useProfileViewModel = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await profileService.fetchProfile();
      if (res.data.success) {
        setProfile(res.data.userData);
        return res.data.userData;
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      console.log(err)
      setError(
        (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          'Failed to load profile'
      );
      console.log(error)
      return null;
    } finally {
      setLoading(false);
    }
  };
  const fetchProfileByEmail=async(email)=>{
    setLoading(true);
    setError(null);
    try{
      const res=await profileService.fetchUserProfileByEmail(email);
      if(res.data.success)
      {
        setProfile(res.data.userData);
        return res.data.userData
      }
      else{
        throw new Error(res.data.message);
      }
    }
    catch(err)
    {
      setError(
        (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          'Failed to load profile'
      );
      return null;
    }
    finally{
      setLoading(false);
    }
  }

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await profileService.fetchUserPosts();
      if (res.data.success) {
        const fetched = res.data.data.posts || [];
        setPosts(Array.isArray(fetched) ? fetched : []);
        return fetched;
      } else {
        setPosts([]);
        return [];
      }
    } catch (err) {
      setError(
        (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          'Failed to load posts'
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deletePost= async(postId)=>{
    setLoading(true);
    setError(null);
    try{
      const res= await profileService.dletePost(postId);
      if(res.data.success)
        {
          console.log(res)
          return res;
        } 
        else{
          setError("error deleting post");
        }
         console.log(res)
    }
    catch(err)
    {
      setError(err);
      console.log(err)
    }
    finally{
    setLoading(false)
    }
  }

  const fetchPostsByEmail= async(email)=>{
    setLoading(true);
    setError(null);
    try{
      const res = await profileService.fetchUserPostsByEmail(email);
         if (res.data.success) {
        const fetched = res.data.data.posts || [];
        setPosts(Array.isArray(fetched) ? fetched : []);
        return fetched;
      } else {
        setPosts([]);
        return [];
      }
    } catch (err) {
      setError(
        (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          'Failed to load posts'
      );
      return null;
    } finally {
      setLoading(false);
    }

  }
  const editProfile = async (fields, avatarFile, bannerFile) => {
    setLoading(true); setError(null);
    try {
      const res = profileService.updateProfile(fields);
      console.log("response is ", res);
      if (res.data.success) {
        setProfile(res.data.userData);
        return res.data.userData;
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };
  const followUser = async(email)=>{
    setLoading(true);
    setError(null);
    try{
      const res = profileService.followUser(email);
      if(res.data.success)
      {
        return("followed user");
      }
      else{
        throw new Error(res.data.message);
      }
    }
    catch(error)
    {
      setError(error);
    }
    setLoading(false);
  }

  return {
    profile,
    posts,
    loading,
    error,
    fetchProfile,
    fetchPosts,
    editProfile,
    fetchPostsByEmail,
    fetchProfileByEmail,
    followUser,
    deletePost
  };
};

export default useProfileViewModel;
