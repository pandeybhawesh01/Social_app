import apiClient from '../api/apiClient';
import { Endpoints } from '../constants/Endpoints';

export const profileService = {
  fetchProfile: () => apiClient.get(Endpoints.profileData),
  fetchUserPosts: () => apiClient.get(Endpoints.userPosts),
  fetchUserPostsByEmail: (email)=>apiClient.get(Endpoints.userPostsByEmail(email)),
  fetchUserProfileByEmail:(email)=>apiClient.get(Endpoints.profileDataByEmail(email)),
  updateProfile: (payload) => {
    // If it's a FormData, let axios set multipart/form-data
    if (payload instanceof FormData) {
      return apiClient.put(Endpoints.updateProfile, payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
    // otherwise send JSON
    return apiClient.put(Endpoints.updateProfile, payload);
  }
};