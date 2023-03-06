import React from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import Hero from '@/components/HeroComponent';
import config from '@/components/config';
import ImageCarousel from '@/components/ImageCarouselComponent';
import { CgPin } from 'react-icons/cg';
import { GiKnifeFork } from 'react-icons/gi';
import IconComponent from '@/components/IconComponent';
import EventPackageComponent from '@/components/EventPackageComponent';

const LocationDetails_ = () => {
  return <div></div>;
};

const IconsAndHours = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="flex">
        <IconComponent
          title="DIRECTIONS"
          icon={<CgPin className="w-full h-full" />}
        />
        <IconComponent
          title="MENU"
          icon={<GiKnifeFork className="w-full h-full" />}
        />
      </div>

      <div className="">
        <div>
          <span className="text-primary font-bold">HOURS:</span>{' '}
          <span>Monday - Sunday 9am-11pm</span>
        </div>
        <div>
          <span className="text-primary font-bold">PHONE:</span>{' '}
          <span>(518) 280-6347</span>
        </div>
      </div>
    </div>
  );
};

function LocationDetails() {
  const router = useRouter();

  const locationId = router.query.location_id;

  const locObj = config.locations.find((l) => l.id === locationId);

  return (
    <Layout>
      <Hero
        imageUrl={locObj?.imageUrl}
        title={locObj?.title}
        address={locObj?.address}
        btnTitle="BOOK NOW"
        btnClick={() => {}}
        size="md"
      />

      <div className="mx-4 mt-4 shadow-xl rounded-xl">
        {' '}
        <div className="border border-b-0 border-gray-200">
          <ImageCarousel images={locObj?.images || []} />
        </div>
        <div className="flex flex-col p-4 border border-t-0 border-gray-200 rounded-b-xl">
          <IconsAndHours />
        </div>
      </div>
      {/* Location Details */}
      <div className="my-10 p-8 pt-0 w-full">
        {/* Icons & Hours */}
        {/* Event Packages */}
        <div className="m-1 flex justify-center flex-col w-full mx-auto">
          <h1 className="text-primary font-bold text-4xl mb-2">
            EVENT PACKAGES:
          </h1>
          <div className="flex flex-wrap justify-center">
            {locObj?.eventPackages?.map((pkg, index) => {
              return (
                <div className="w-full md:w-[400px] m-2">
                  <EventPackageComponent title={pkg.title} list={pkg.details} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Party Notice */}
        {/* Suite & Bay Pricing */}
        {/* Contact Us */}
      </div>
      <hr />
      <div className="m-2">
        <p className="font-bold">FOR PARTIES WITH 10 OR MORE PEOPLE</p>
        <ul className="list-disc ml-5">
          <li>Food must be pre-ordered 10 days prior to event</li>
          <li>
            A 5% service fee and 15% gratuity will be included in the total
          </li>
        </ul>
      </div>
      <hr />
      <div className="mb-20"></div>
    </Layout>
  );
}

export default LocationDetails;
