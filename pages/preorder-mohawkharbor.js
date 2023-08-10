import React from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import Hero from '@/components/HeroComponent';
import config from '@/components/config';
import ImageCarousel from '@/components/ImageCarouselComponent';
import { CgPin } from 'react-icons/cg';
import { GiKnifeFork } from 'react-icons/gi';
import IconComponent from '@/components/IconComponent';
import MenuPlatterComponent from '@/components/MenuPlatterComponent';
import BayCardComponent from '@/components/BayCardComponent';
import Testimonials from '@/components/TestimonialComponent';
import PreOrderFormComponentMohawkHarbor from '@/components/PreOrderFormComponentMohawkHarbor';

function PreOrder() {
  const router = useRouter();

  return (
    <Layout>
      {/* <Hero imageUrl={config?.contact?.imageUrl} title="CONTACT" size="md" /> */}
      <div className="my-10 p-8 md:px-20 pt-0 w-full">
        <div className="m-1 flex justify-center flex-col w-full mx-auto text-primary">
          <div className="flex flex-col flex-wrap justify-center text-black">
            <PreOrderFormComponentMohawkHarbor />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PreOrder;
