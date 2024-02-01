import React, { useState } from 'react';
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
import Modal from '@/components/Modal';

function Menu() {
  const router = useRouter();

  const [showMenuModal, setShowMenuModal] = useState(false);

  return (
    // <Layout bg={'bg-[#2f2f2f]'}>
    <Layout>
      <Hero
        imageUrl={config?.menuSaratoga?.imageUrl}
        title="PARTY MENU"
        size="md"
      />
      <div className="flex flex-col items-center w-full">
        <div className="max-w-[1300px]">
          <div className="block w-full h-[250px]">
            <Testimonials
              testimonials={config?.testimonials}
              type="menu"
              color="light"
            />
          </div>
          <hr />

          <div className="my-10 p-8 md:px-20 pt-0 w-full">
            <div className="m-1 flex justify-center flex-col w-full mx-auto text-primary">
              <h1 className=" font-bold text-4xl mb-1">PARTY PLATTERS:</h1>
              <h4 className=" ml-0.5 font-bold text-md">
                All platters serve 8-10 guests each.
              </h4>
              <h4 className="text-black italic ml-0.5 font-normal text-md mb-4">
                Pricing is subject to change.
              </h4>
              <div className="flex flex-wrap justify-center text-white">
                {config?.menuSaratoga?.items.map((option, index) => {
                  return (
                    <div className="w-full md:w-[400px] m-1" key={index}>
                      <MenuPlatterComponent
                        title={option?.title}
                        imageUrl={option?.imgUrl}
                        cost={option?.cost}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col justify-center mt-20 ">
                <h1 className=" font-bold text-4xl mb-1">
                  DRINKS & BOTTLE SERVICE
                </h1>
                <div className="flex flex-wrap flex-col w-full h-[300px] lg:h-[700px]">
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
                <div className="mt-5 text-black">
                  {config?.menuSaratoga?.drinks?.map((drink, index) => {
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
                  <button
                    onClick={() => setShowMenuModal(true)}
                    className="p-2 mt-3 bg-primary text-white font-bold"
                  >
                    BOTTLE SERVICE MENU
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        onClose={() => {
          setShowMenuModal(false);
        }}
        isOpen={showMenuModal}
      >
        <div>
          <iframe
            src={'/BottleServiceMenu.pdf'}
            width="100%"
            height="800"
            style={{ border: 'none' }}
            title="PDF Viewer"
          ></iframe>
        </div>
      </Modal>
    </Layout>
  );
}

export default Menu;
