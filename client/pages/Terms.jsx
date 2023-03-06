import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {

  return (
    <div className='text-white flex flex-wrap justify-center'>
      <h1 className='bold text-center w-full'>
        Terms of Use:
      </h1>
      <p className='text-sm mt-2 mb-2 ml-4 mr-4 text-center max-w-md'>
        Welcome to our demo website! By accessing and using this website, you agree to be bound by the following terms and conditions:
        This website is for demo purposes only and should not be used for any commercial purposes.
        We reserve the right to modify or terminate the website and these terms and conditions at any time without prior notice.
        We are not responsible for any errors or omissions, or for the results obtained from the use of this website.
        Your use of this website is at your own risk. We shall not be liable for any direct, indirect, incidental, special or consequential damages arising out of or relating to the use of this website.
        You agree to indemnify and hold harmless our website and its affiliates, officers, agents, and employees from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of this website.
      </p>
      <div className="basis-full" />
      <Link to='/register'>
        <p className='text-blue-500 underline'>Click here to go back</p>
      </Link>

    </div>
  );
};

export default TermsOfService;
