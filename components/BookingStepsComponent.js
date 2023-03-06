import React from 'react';

const Card = ({ imgUrl, title, message, onClick, btnTitle }) => {
  return (
    <div className="flex flex-col md:flex-row h-fit md:h-[275px] w-full mb-10 bg-white">
      <div className="w-full md:w-1/2  md:max-w-[500px] flex items-center">
        <img
          src={imgUrl}
          className="h-[275px] w-full object-cover"
          alt={title}
        />
      </div>
      <div className="w-full md:w-1/2 p-1 pt-3 md:p-4">
        <h2 className="text-2xl font-bold mb-2 text-primary">{title}</h2>
        <p className="text-black text-sm">{message}</p>
        <button
          className="mt-4 bg-primary hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClick}
        >
          {btnTitle}
        </button>
      </div>
    </div>
  );
};

export default Card;
