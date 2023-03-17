const axios = require('axios');

const handleRegistration = async (data, setErrorMessage, setSuccessMessage) => {
  const apiUrl = '/marvel/registration';
  let profilePictureUrl = null;

  if (data.file) {
    const formData = new FormData();
    formData.append('image', data.file);
    const uploadUrl = '/marvel/upload';

    try {
      const response = await axios.post(uploadUrl, formData);
      profilePictureUrl = `/images/${response.data}`;
    } catch (error) {
      console.error(error);
    }
  }

  try {
    await axios.post(apiUrl, { ...data, profilePictureUrl });
    setSuccessMessage('Account created successfully. Please wait 5 seconds before navigating to the sign-in page. If you are not redirected, click ');
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 409) {
      const data = error.response;
      if (data.status === 409) {
        setErrorMessage(data.data.error);
        console.log('handler log', data.data.error);
      } else {
        setErrorMessage('An error occurred while fetching data. Please try again later.');
      }
    } else {
      setErrorMessage('An error occurred while fetching data. Please try again later.');
    }
  }
};
export default handleRegistration;
