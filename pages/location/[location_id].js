import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import Hero from '@/components/HeroComponent';
import config from '@/components/config';
import ImageCarousel from '@/components/ImageCarouselComponent';
import EventPackageComponent from '@/components/EventPackageComponent';
import BayCardComponent from '@/components/BayCardComponent';
import IconsAndHours from '@/components/IconsAndHoursComponent';
import Amenities from '@/components/AmenitiesComponent';
// import LocationMapModal from '@/components/LocationMapModal';
const LocationMapModal = dynamic(
  () => import('@/components/LocationMapModal'),
  { ssr: false }
);

function LocationDetails() {
  const router = useRouter();

  const locationId = router.query.location_id;

  const locObj = config.locations.find((l) => l.id === locationId);

  const [showMapModal, setShowMapModal] = useState(false);

  return (
    <Layout>
      <Hero
        imageUrl={locObj?.locationHeaderImgUrl}
        title={locObj?.title}
        address={locObj?.address}
        btnTitle="START PLANNING"
        btnClick={() => {
          router.push('https://thebunker.tripleseat.com/party_request/31049');
        }}
        size="md"
      />
      <div className="flex flex-col items-center">
        <div className="max-w-[1300px]">
          <div className="mx-4 mt-4 shadow-xl rounded-xl">
            {' '}
            {locObj?.matterportUrl ? <div className="border border-b-0 border-gray-200">
              {/* <ImageCarousel images={locObj?.images || []} /> */}
              {/* {locObj?.showBayDescriptions !== true && (
                <div>
                  <h1 className="text-primary font-bold text-4xl m-3 uppercase">
                    Matterport 3D Tour
                  </h1>
                </div>
              )} */}
              <iframe
                style={{ zIndex: 1 }}
                width="100%"
                height="480px"
                src={locObj?.matterportUrl}
                frameBorder="0"
                allowFullScreen
                allow="xr-spatial-tracking"
              ></iframe>
            </div> : null}
            <div className="flex flex-col p-4 border border-t-0 border-gray-200 rounded-b-xl">
              <IconsAndHours
                locObj={locObj}
                mapClick={() => {
                  setShowMapModal(true);
                }}
                mapClose={() => {
                  setShowMapModal(false);
                }}
              />
							{locObj?.notices?.length &&
							<div className="border bg-red-50 border-primary p-2 rounded text-primary list-disc my-4">
                {
                  locObj.notices.map((n, i) => {
                    return <li key={i}>{n}</li>;
                  })}
									
							</div>
}
              <Amenities amenities={locObj?.amenities} />
            </div>
          </div>
          <div className="my-10 p-8 md:px-20 pt-0 w-full">
            <div className="m-1 flex justify-center flex-col w-full mx-auto">
              <h1 className="text-primary font-bold text-4xl mb-0.5">
                EVENT PACKAGES:
              </h1>

              <p className="ml-0.5">Party times can be customized</p>
              <div className="flex flex-wrap justify-center">
                {locObj?.eventPackages?.map((pkg, index) => {
                  return (
                    <div className="w-full md:w-[400px] m-2" key={index}>
                      <EventPackageComponent
                        title={pkg.title}
                        list={pkg.details}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <hr />
          <div className="p-2 px-5 md:px-20 py-10 bg-gray-200 text-2xl">
            <p className="font-bold text-primary">FOR ALL PARTIES</p>
            <ul className="list-disc ml-5 text-lg">
              <li>Food must be pre-ordered 10 days prior to event</li>
              <li>
                A 5% service fee and 15% gratuity will be added to the total
              </li>
            </ul>
          </div>
          <hr />
          {locObj?.showBayDescriptions === true && (
            <div className="my-20 px-8 md:px-20">
              <h1 className="text-primary font-bold text-4xl mb-4">
                SUITE & BAY PRICING:
              </h1>{' '}
              {locObj?.bays?.map((bay, index) => {
                return (
                  <BayCardComponent
                    title={bay.name}
                    imageUrl={bay.imageUrl}
                    list={bay.details}
                    rate={bay.rate}
                    detail={bay.detail}
                    key={index}
                  />
                );
              })}
            </div>
          )}
          {/* <hr />
          <div className="p-2 px-5 md:px-20 py-10 bg-white text-black text-xl">
            <p className="font-bold">
              Questions? Email us at{' '}
              <span className="text-primary">
                <a href="mailto:info@bunkerparties.golf">
                  info@bunkerparties.com
                </a>
              </span>
            </p>
          </div> */}
        </div>
        {showMapModal ? (
          <LocationMapModal
            locObj={locObj}
            close={() => setShowMapModal(false)}
          />
        ) : null}
      </div>
    </Layout>
  );
}

export default LocationDetails;
