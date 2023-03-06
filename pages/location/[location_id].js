import React from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import Hero from '@/components/HeroComponent';
import config from '@/components/config';
import ImageCarousel from '@/components/ImageCarouselComponent';

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

      <ImageCarousel images={locObj?.images || []} />
    </Layout>
  );
}

export default LocationDetails;
