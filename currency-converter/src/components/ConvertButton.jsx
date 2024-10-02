import React from 'react';

const ConvertButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full p-3 bg-teal-500 text-white rounded-md mt-4 hover:bg-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-300"
    >
      Convert
    </button>
  );
};

export default ConvertButton;
