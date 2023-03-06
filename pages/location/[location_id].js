import React from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';

function LocationDetails() {
  const router = useRouter();

  const locationId = router.query.location_id;

  return (
    <Layout>
      <div className="">LocationDetails {locationId} </div>
    </Layout>
  );
}

export default LocationDetails;
