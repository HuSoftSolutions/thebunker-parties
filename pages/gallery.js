import config from '@/components/config.json';
import React from 'react';
import Image from 'next/image';
import Layout from '@/components/Layout';
import Hero from '@/components/HeroComponent';

const LAYOUT = [0, 3, 4, 7, 8, 11, 12, 15, 16, 19, 20, 23];

const Gallery = () => {
  return (
    <Layout>
      <Hero
        imageUrl="https://res.cloudinary.com/dy3tzr2tc/image/upload/v1678736682/thebunkerparties/gallery/DSCF4931_v9ge0y.jpg"
        title="GALLERY"
      />
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
        {config?.gallery?.map((image, index) => (
          <div
            key={index}
            className="bg-gray-200 h-64 flex items-center justify-center overflow-hidden"
          >
            <img src={image} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div> */}
      <div className="grid grid-cols-3">
        {config?.gallery?.map((image, index) =>
          image?.type === 'img' ? (
            <div
              key={index}
              className={`bg-gray-200 h-fit sm:h-96 flex items-center justify-center overflow-hidden ${
                LAYOUT.includes(index)
                  ? 'col-span-3 sm:col-span-2'
                  : 'col-span-3 sm:col-span-1'
              }`}
            >
              <img
                src={image.value}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div
              key={index}
              className={`bg-black bg-opacity-80 text-white text-lg sm:text-xl px-10 sm:px-20 italic h-fit sm:h-96 flex items-center justify-center overflow-hidden min-h-[300px] ${
                LAYOUT.includes(index)
                  ? 'col-span-3 sm:col-span-2'
                  : 'col-span-3 sm:col-span-1'
              }`}
            >
              "{image.value}"
            </div>
          )
        )}
      </div>
    </Layout>
  );
};

export default Gallery;
