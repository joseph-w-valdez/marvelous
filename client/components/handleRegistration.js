const axios = require('axios');

const handleRegistration = async (data, setErrorMessage) => {
  const apiUrl = 'http://localhost:3000/marvel/registration';
  let profilePictureUrl = null;

  if (data.file) {
    const formData = new FormData();
    formData.append('image', data.file);
    const uploadUrl = 'http://localhost:3000/marvel/upload';

    try {
      const response = await axios.post(uploadUrl, formData);
      profilePictureUrl = `http://localhost:3000/images/${response.data}`;
    } catch (error) {
      console.error(error);
    }
  }

  try {
    const response = await axios.post(apiUrl, { ...data, profilePictureUrl });
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 409) {
      const data = error.response;
      if (data.status === 409) {
        setErrorMessage(data.data.error);
      } else {
        setErrorMessage('An error occurred while fetching data. Please try again later.');
      }
    } else {
      setErrorMessage('An error occurred while fetching data. Please try again later.');
    }
  }
};
export default handleRegistration;
