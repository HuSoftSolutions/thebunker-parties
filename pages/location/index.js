import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/HeroComponent';
import LocationCard from '@/components/LocationCardComponent';
import config from '@/components/config.json';

function Locations() {
  return (
    <Layout>
      <Hero
        imageUrl="https://storage.googleapis.com/thebunker-assets/thebunker/Cloudinary_Archive_2024/IMG_7028_bmbry0.jpg"
        title="OUR LOCATIONS"
      />
      <div className="flex justify-center my-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {config?.locations.map((location, index) => (
            <LocationCard key={index} location={location} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Locations;
