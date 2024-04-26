import axios from 'axios';

// Function to sign up a user
export const signUp = async (userData) => {
  try {
    const response = await axios.post('http://localhost:8000/api/signup/', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to sign in a user
export const signIn = async (userData) => {
  try {
    const response = await axios.post('http://localhost:8000/api/signin/', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
