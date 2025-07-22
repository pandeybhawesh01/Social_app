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
      setError(
        (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          'Failed to load profile'
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

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
    const editProfile = async (fields) => {
    setLoading(true);
    setError(null);
    console.log("filds to be updated ", fields)
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

  return {
    profile,
    posts,
    loading,
    error,
    fetchProfile,
    fetchPosts,
    editProfile,
  };
};

export default useProfileViewModel;
