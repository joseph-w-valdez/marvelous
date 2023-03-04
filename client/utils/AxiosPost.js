import axios from 'axios';

const axiosPost = async (url, data) => {
  const accessToken = localStorage.getItem('authToken');
  const headers = {
    'X-Access-Token': accessToken
  };
  return axios.post(url, data, { headers });
};

export default axiosPost;
