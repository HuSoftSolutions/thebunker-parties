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


function Testimonials() {
  const router = useRouter();

  return (
    <Layout>
      <Hero imageUrl={config?.testimonialsPage?.imageUrl} title="TESTIMONIALS" size="md" />
      <div className="my-10 p-8 md:px-20 pt-0 w-full">
        <div className="m-1 flex justify-center flex-col w-full mx-auto text-black">
          <div className="flex flex-wrap justify-center text-black">
            {config?.testimonialsPage?.testimonials.map((item, index) => {
              return (
                <div
                  className="w-full m-1 border-b border-black last:border-none py-4"
                  key={index}
                >
                  <div className="text-black p-1">
                    {item.message}
                  </div>
                  <div className="p-1 pt-3">{item.from}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Testimonials;
