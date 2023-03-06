import React from 'react';
import { useRouter } from 'next/router';

function Hero({ imageUrl, title, message, btnTitle, btnClick, size, address }) {
  const router = useRouter();
  let h = '350px';
  switch (size) {
    case 'lg':
      h = '700px';
      break;
    case 'md':
      h = '500px';
      break;
  }
  return (
    <div
      className="bg-cover bg-center flex flex-col justify-center items-center text-white w-full"
      style={{
        backgroundImage: `url(${imageUrl})`,
        height: h,
      }}
    >
      <div className="p-10 bg-black bg-opacity-70 h-full w-full flex items-center justify-center flex-col">
        <h1 className="text-[35px] md:text-[50px] font-bold text-center my-2">
          {title}
        </h1>
        {message && <p className="text-md text-center my-2">{message}</p>}
        {btnTitle && (
          <button
            className="p-2 bg-primary hover:bg-red-700 text-white rounded my-2"
            onClick={btnClick}
          >
            {btnTitle}
          </button>
        )}
        {address && <p className="text-md text-center my-2">{address}</p>}
      </div>
    </div>
  );
}

export default Hero;
