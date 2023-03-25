import React from 'react';
import { useRouter } from 'next/router';

const HeroVideoComponent = ({
  imageUrl,
  title,
  message,
  btnTitle,
  btnClick,
  size,
  address,
}) => {
  let h = '300px';
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
      className={`relative bg-cover bg-center flex flex-col justify-center items-center text-white w-full h-[500px] sm:h-[${h}]`}
    >
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        id="video"
      >
        <source src={imageUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 flex justify-center items-center flex-col">
        <h1 className="text-[28px] md:text-[50px] font-bold text-center my-2">
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
};

export default HeroVideoComponent;
