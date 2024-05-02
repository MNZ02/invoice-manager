import { loginSuccess, setLoading } from './authSlice';

export const checkSession = () => async (dispatch) => {
  // Perform session check logic (e.g., check if token exists in local storage)
  const token = localStorage.getItem('token');
  if (token) {
    // Optionally, you can validate the token on the server-side
    // Example: const response = await axios.post('/api/validateToken', { token });
    // If token is valid, dispatch login success action with user data
    dispatch(loginSuccess({ id: 1, username: 'exampleUser' }));
  }
  dispatch(setLoading(false));
};
