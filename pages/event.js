import React from 'react';
import Layout from '@/components/Layout';
import EventFormComponent from '@/components/EventFormComponent';

function Event() {
  return (
    <Layout>
      <div className="my-10 p-8 md:px-20 pt-0 w-full">
        <EventFormComponent />
      </div>
    </Layout>
  );
}

export default Event;
