import axios from 'axios';

const apiUrl = '/marvel';

export const signIn = async (username, password) => {
  try {
    const response = await axios.post(`${apiUrl}/sign-in`, { username, password });
    const { token, profilePictureUrl } = response.data;

    localStorage.setItem('authToken', token);
    return { success: true, profilePictureUrl };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export const signOut = () => {
  localStorage.removeItem('authToken');
};
