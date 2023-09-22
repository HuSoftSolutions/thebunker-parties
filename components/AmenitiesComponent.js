
// Importing required modules and components
import React from 'react';
import Image from 'next/image';

// Define the Amenities component
const Amenities = ({ amenities }) => {
  return (
		<div>

<h1 className="text-2xl pt-4">AMENITIES:</h1>

    <div className="flex flex-wrap justify-center md:justify-start mt-10">
      {amenities?.map((a, i) => {
				console.log(a.icon)
				return(
        <div
          key={i}
          className="flex flex-col items-center text-center mb-8 justify-center"
          style={{ width: '130px' }}
        >
          <Image
            // className="object-contain mb-2"

              height={ a.height || 50}
              width={ a.width || 50}
            
            src={a.icon}
            alt={a.title}
          />
          <p className="text-xs pt-2">{a.title}</p>
        </div>
      )})}
    </div>
		</div>

  );
};

// Export the Amenities component
export default Amenities;
