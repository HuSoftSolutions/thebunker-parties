import React from 'react';

function MenuPlatterComponent({ title, imageUrl, cost }) {
  return (
    <div
      className="flex items-end text-start m-1 shadow-xl h-[200px] bg-gray-100 transform transition-transform hover:scale-105  hover:bg-gray-200 bg-cover bg-center "
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <p className="text-md bg-black bg-opacity-50 w-full h-fit p-2">
        {title} - ${cost}
      </p>
    </div>
  );
}

export default MenuPlatterComponent;
