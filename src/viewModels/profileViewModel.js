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
      console.log("res in view model ", res);
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
  const editProfile = async (fields, avatarFile, bannerFile) => {
    setLoading(true); setError(null);
    try {
      let payload = fields;
      // if either file is present, build FormData
      if (avatarFile || bannerFile) {
        const form = new FormData();
        Object.entries(fields).forEach(([k, v]) => {
          if (v != null) form.append(k, v);
        });
        if (avatarFile) form.append('image', avatarFile);
        if (bannerFile) form.append('banner', bannerFile);
        payload = form;
      }
      const res = await profileService.updateProfile(payload);
      if (res.data.success) {
        setProfile(res.data.userData);
        return res.data.userData;
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setError(msg);
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
