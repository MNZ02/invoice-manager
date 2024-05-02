import axios from 'axios';

const loginAPI = async (formData) => {
  try {
    const response = await axios.post('/api/auth/login', formData);
    const user = response.data.user; // Assuming the API returns the user object upon successful login
    // You can perform additional logic here if needed
    return user;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export { loginAPI };
