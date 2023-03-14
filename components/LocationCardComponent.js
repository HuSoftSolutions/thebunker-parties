import React from 'react';
import { useRouter } from 'next/router';

const LocationCard = ({ location }) => {
  const router = useRouter();
  return (
    <div
      className=" text-white h-[300px] w-[300px] 
      bg-cover bg-center overflow-hidden shadow-lg"
      style={{ backgroundImage: `url(${location.businessCardImgUrl})` }}
      onClick={() => router.push(location.to)}
    >
      <div className="flex bg-black bg-opacity-50 w-full h-full items-center justify-center hover:bg-opacity-0 cursor-pointer">
        <h2 className="text-4xl font-bold text-center">{location.title}</h2>
      </div>
    </div>
  );
};

export default LocationCard;
