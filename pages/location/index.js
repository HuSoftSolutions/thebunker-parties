import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/HeroComponent';
import LocationCard from '@/components/LocationCardComponent';
import config from '@/components/config.json';

function newImg() {
  return 'https://source.unsplash.com/random/1600x900';
}

function Locations() {
  return (
    <Layout>
      <Hero imageUrl={newImg()} title="OUR LOCATIONS" />
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
