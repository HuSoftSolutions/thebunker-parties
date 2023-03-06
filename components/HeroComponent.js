import React from 'react';

function Hero({ imageUrl, title, subtitle, message }) {
  return (
    <div
      className="bg-cover bg-center h-[500px] flex flex-col justify-center items-center text-white w-full"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="p-10 bg-black bg-opacity-70 h-full w-full flex items-center justify-center flex-col">
        <h1 className="text-[35px] md:text-[50px] font-bold text-center my-2">
          {title}
        </h1>
        <p className="text-md text-center my-2">{message}</p>
        <button className="p-2 bg-primary hover:bg-red-700 text-white rounded my-2">
          SEE OUR LOCATIONS
        </button>
      </div>
    </div>
  );
}

export default Hero;
