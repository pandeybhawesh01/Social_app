import apiClient from '../api/apiClient';
import { Endpoints } from '../constants/Endpoints';

export const profileService = {
  fetchProfile: () => apiClient.get(Endpoints.profileData),
  fetchUserPosts: () => apiClient.get(Endpoints.userPosts),
};