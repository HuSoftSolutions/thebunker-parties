import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LocationMapModal = (props) => {
  console.log(props.locObj);
  const handleClose = () => props.close();
  const AnyReactComponent = ({ text }) => (
    <div className="pin">
      <img src={pin} alt="pin" />
      <strong>{text}</strong>
    </div>
  );

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
          <div className="p-4">
            <div className="h-80 md:h-96">
              <MapContainer
                center={[
                  props?.locObj?.coordinates?.lat,
                  props?.locObj?.coordinates?.lng,
                ]}
                zoom={15}
                scrollWheelZoom={false}
                style={{ height: '100%' }}
              >
                <TileLayer
                  attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, CC-BY-SA'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <Marker
                  position={[
                    props?.locObj?.coordinates?.lat,
                    props?.locObj?.coordinates?.lng,
                  ]}
                >
                  <Popup>San Francisco, California</Popup>
                </Marker> */}
                <Marker
                  position={[
                    props?.locObj?.coordinates?.lat,
                    props?.locObj?.coordinates?.lng,
                  ]}
                ></Marker>
              </MapContainer>
            </div>
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
