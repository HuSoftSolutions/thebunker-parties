import config from '@/components/config.json';
import React from 'react';
import Image from 'next/image';
import Layout from '@/components/Layout';

const Gallery = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
        {config?.gallery?.map((image, index) => (
          <div
            key={index}
            className="bg-gray-200 h-64 flex items-center justify-center overflow-hidden"
          >
            <img src={image} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Gallery;
