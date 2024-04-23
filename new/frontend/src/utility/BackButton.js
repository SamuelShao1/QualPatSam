import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/'); // Navigates back to the previous page
  };

  return (
    <button onClick={goBack} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-full">
      Go Back
    </button>
  );
};

export default BackButton;
