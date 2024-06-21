import axios from "axios";

// Define the base URL for your API
const API_BASE_URL = "http://54.242.169.193:9000/api";

export const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/get-all-users`);
  return response.data;
};

export const fetchTourGuides = async () => {
  const response = await axios.get(`${API_BASE_URL}/get-all-guides`);
  return response.data;
};

export const fetchTourGuideApplications = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/get-all-guides-applications`
  );
  return response.data;
};

export const fetchFavourites = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/get-all-lists?user=662eeda1b9e63e5fabaa5829`
  );
  return response.data;
};
