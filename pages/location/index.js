import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/HeroComponent';
import LocationCard from '@/components/LocationCardComponent';
import config from '@/components/config.json';

function Locations() {
  return (
    <Layout>
      <Hero
        imageUrl="https://res.cloudinary.com/dy3tzr2tc/image/upload/v1678232723/thebunkerparties/locations/IMG_7028_bmbry0.jpg"
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
