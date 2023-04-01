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
        btnTitle="BOOK NOW"
        btnClick={() => {
          router.push('/event');
        }}
        size="md"
      />
      <div className="flex flex-col items-center">
        <div className="max-w-[1300px]">
          <div className="mx-4 mt-4 shadow-xl rounded-xl">
            {' '}
            <div className="border border-b-0 border-gray-200">
              {/* <ImageCarousel images={locObj?.images || []} /> */}
              <iframe
                style={{ zIndex: 1 }}
                width="100%"
                height="480px"
                src={locObj?.matterportUrl}
                frameBorder="0"
                allowFullScreen
                allow="xr-spatial-tracking"
              ></iframe>
            </div>
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
            <p className="font-bold text-primary">
              FOR PARTIES WITH 10 OR MORE PEOPLE
            </p>
            <ul className="list-disc ml-5 text-lg">
              <li>Food must be pre-ordered 10 days prior to event</li>
              <li>
                A 5% service fee and 15% gratuity will be added to the total
              </li>
            </ul>
          </div>
          {/* <hr />
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
                />
              );
            })}
          </div> */}
          <hr />
          <div className="p-2 px-5 md:px-20 py-10 bg-white text-black text-xl">
            <p className="font-bold">
              Questions? Email us at{' '}
              <span className="text-primary"> events@getinthebunker.golf</span>
            </p>
          </div>
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
