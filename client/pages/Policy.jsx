import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className='text-white flex flex-wrap justify-center'>
      <h1 className='bold text-center w-full'>
        Privacy Policy:
      </h1>
      <p className='text-sm mt-2 mb-2 ml-4 mr-4 text-center max-w-md'>
        We take your privacy very seriously. Our website does not collect any personally identifiable information about you. We may collect certain non-personally identifiable information, such as your IP address, browser type, and the pages you visit on our website, in order to improve our website and user experience.
        We do not sell or share any information collected on our website with any third parties. We may use cookies to enhance your user experience, but you may disable cookies in your browser settings if you prefer.
        This website is for demo purposes only and does not collect any sensitive or confidential information. We do not provide any guarantees regarding the security of your information on this website.
        If you have any questions or concerns regarding our TOS or privacy policy, please contact us at [redacted]
      </p>
      <div className="basis-full" />
      <Link to='/register'>
        <p className='text-blue-500 underline'>Click here to go back</p>
      </Link>

    </div>
  );
};

export default PrivacyPolicy;
