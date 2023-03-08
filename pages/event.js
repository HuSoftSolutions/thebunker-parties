import React from 'react';
import Layout from '@/components/Layout';
import EventFormComponent from '@/components/EventFormComponent';

function Event() {
  return (
    <Layout>
      <div className="p-5">
        <EventFormComponent />
      </div>
    </Layout>
  );
}

export default Event;
