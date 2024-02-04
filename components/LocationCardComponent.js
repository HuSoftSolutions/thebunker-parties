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
      <div className={`flex bg-black w-full h-full items-center justify-center ${location.businessCardImgUrl ? 'bg-opacity-50 hover:bg-opacity-0' : 'bg-opacity-100 hover:bg-primary'} cursor-pointer`}>
        <h2 className="text-4xl font-bold text-center uppercase">{location.title}</h2>
      </div>
    </div>
  );
};

export default LocationCard;
