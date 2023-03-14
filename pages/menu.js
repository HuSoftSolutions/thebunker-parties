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

function Menu() {
  const router = useRouter();

  return (
    <Layout bg={'bg-[#2f2f2f]'}>
      <Hero imageUrl={config?.menu?.imageUrl} title="PARTY MENU" />

      <div className="my-10 p-8 md:px-20 pt-0 w-full">
        <div className="m-1 flex justify-center flex-col w-full mx-auto text-white">
          <h1 className=" font-bold text-4xl mb-1">PARTY PLATTERS:</h1>
          <h4 className=" ml-0.5 font-bold text-md mb-4">
            All platters serve 8-10 guests each.
          </h4>
          <div className="flex flex-wrap justify-center">
            {config?.menu?.items.map((option, index) => {
              return (
                <div className="w-full md:w-[400px] m-1">
                  <MenuPlatterComponent
                    title={option?.title}
                    imageUrl={option?.imgUrl}
                    cost={option?.cost}
                  />
                </div>
              );
            })}

            <div>
              Wing flavors: Garlic parm, Thai chili, BBQ, Stinger, Bourbon Brown
              Sugar, Mango Habanero and Buffalo
            </div>
          </div>
          <div className="flex flex-col justify-center mt-20 ">
            <h1 className=" font-bold text-4xl mb-1">
              DRINKS & BOTTLE SERVICE
            </h1>
            <h4 className=" ml-0.5 font-bold text-md mb-6">
              Full bar available based on consumption
            </h4>
            <div className="flex flex-wrap flex-col w-full  h-[300px] lg:h-[700px]">
              <div className="w-1/3 h-1/2">
                <img
                  src={config?.menu?.images[0]}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="w-1/3 h-1/2">
                <img
                  src={config?.menu?.images[1]}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="w-1/3 h-1/2">
                <img
                  src={config?.menu?.images[2]}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="w-1/3 h-1/2">
                <img
                  src={config?.menu?.images[3]}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="w-1/3 h-full">
                <img
                  src={config?.menu?.images[4]}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </div>
            <div className="mt-5">
              {config?.menu?.drinks?.map((drink, index) => {
                return (
                  <div key={index} className="w-full flex flex-wrap my-2">
                    <p className="font-bold whitespace-nowrap mr-1">
                      {drink.title}
                    </p>
                    {drink?.qty !== null && (
                      <span className="font-thin">{drink.qty}</span>
                    )}
                  </div>
                );
              })}
            </div>
            <div>
              <button className="p-2 mt-3 bg-primary text-white font-bold">
                BOTTLE SERVICE MENU
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Menu;
