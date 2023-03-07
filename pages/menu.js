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
import BayCardComponent from '@/components/BayCardComponent';

function Menu() {
  const router = useRouter();

  return (
    <Layout>
      <Hero imageUrl={config?.menu?.imageUrl} title="PARTY MENU" />

      <div className="mx-4 mt-4 shadow-xl rounded-xl mb-10">
        {' '}
        <div className="border border-b-0 border-gray-200">
          <ImageCarousel images={config?.menu?.images || []} />
        </div>
        <div className="flex flex-col md:max-h-[600px] md:flex-wrap p-4 border border-t-0 border-gray-200 rounded-b-xl">
          {config?.menu?.options.map((option, index) => {
            return (
              <div
                key={index}
                className="flex flex-col p-2 w-full md:w-1/2 mb-2"
              >
                <h1 className="text-primary font-bold mb-2">{option.title}</h1>
                <ul>
                  {option?.items.map((item, index) => {
                    return (
                      <div className="py-1" key={index}>
                        {item.title && (
                          <span className="font-bold text-xs md:text-sm mr-2">
                            {item.title}
                          </span>
                        )}
                        <span className="font-normal text-xs md:text-sm">
                          {item.qty}
                        </span>
                      </div>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default Menu;
