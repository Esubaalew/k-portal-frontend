import axios from 'axios';

const domain = 'https://portal.esube.com.et/';

// Function to sign up a user
export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${domain}api/signup/`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to sign in a user
export const signIn = async (userData) => {
  try {
    const response = await axios.post(`${domain}api/signin/`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to get details of the logged-in user
export const getLoggedInUser = async (accessToken) => {
  try {
    const response = await axios.get(`${domain}api/loggedin/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
