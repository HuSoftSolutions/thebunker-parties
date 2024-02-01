

import React, { useRef, useState, useEffect } from 'react';
import GoogleMap from 'google-maps-react-markers';
import Marker from './Marker';

const LocationMapModal = (props) => {
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  const handleClose = () => props.close();

  // This function is called when the map API is loaded
  const onGoogleApiLoaded = ({ map, maps }) => {
    mapRef.current = map;
    setMapReady(true);
  };

  // Handle marker click if needed
  const onMarkerClick = (markerId, lat, lng) => {
    console.log('Marker clicked:', markerId);
    mapRef.current.setCenter({ lat, lng });
  };

  // Ensure the map container has a defined height; you might need to adjust this based on your layout needs
  const mapContainerStyle = {
    height: '80vh', // Adjust the height as needed
    width: '100%'
  };

	const mapOptions = {
		styles: [
			{
				featureType: "poi.business",
				stylers: [{ visibility: "off" }]
			},
			{
				featureType: "poi.attraction",
				stylers: [{ visibility: "off" }]
			},
			{
				featureType: "poi.place_of_worship",
				stylers: [{ visibility: "off" }]
			},
			// You can continue to add more feature types as needed
		]
	};
	

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-8/12 lg:w-1/2">
          <div className="bg-black text-white py-2 px-4">
            <h2 className="text-lg font-semibold">{props?.locObj?.name}</h2>
            <p>
              {props?.locObj?.address}
              <br />
              {props?.locObj?.phone}
            </p>
          </div>
          <div className="p-4" style={mapContainerStyle}>
            <GoogleMap
						options={mapOptions}
              apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY} // Ensure your API key is correctly provided
              defaultCenter={props?.locObj?.coordinates}
              defaultZoom={16}
              onGoogleApiLoaded={onGoogleApiLoaded}
              yesIWantToUseGoogleMapApiInternals={true}
            >
              {mapReady && (
                <Marker
                  lat={props?.locObj?.coordinates.lat}
                  lng={props?.locObj?.coordinates.lng}
                  markerId={props?.locObj?.name}
                  // onClick={() => onMarkerClick(props?.locObj?.name, props?.locObj?.coordinates.lat, props?.locObj?.coordinates.lng)}

                />
              )}
            </GoogleMap>
            
          </div>
          <div className="bg-black py-2 px-4 flex justify-end">
            <button
              className="text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow hover:bg-gray-700 focus:outline-none focus:shadow-outline active:bg-gray-800"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMapModal;

