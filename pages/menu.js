// import React, { useState } from 'react';
// import Layout from '@/components/Layout';
// import { useRouter } from 'next/router';
// import Hero from '@/components/HeroComponent';
// import config from '@/components/config';
// import ImageCarousel from '@/components/ImageCarouselComponent';
// import { CgPin } from 'react-icons/cg';
// import { GiKnifeFork } from 'react-icons/gi';
// import IconComponent from '@/components/IconComponent';
// import MenuPlatterComponent from '@/components/MenuPlatterComponent';
// import BayCardComponent from '@/components/BayCardComponent';
// import Testimonials from '@/components/TestimonialComponent';
// import Modal from '@/components/Modal';

import config from '@/components/config';
import Hero from '@/components/HeroComponent';
import Layout from '@/components/Layout';
import MenuPlatterComponent from '@/components/MenuPlatterComponent';
import Modal from '@/components/Modal';
import Testimonials from '@/components/TestimonialComponent';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Menu() {
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState('menu'); // Default to 'menu'
  const router = useRouter();

  useEffect(() => {
    // Check if the 'menu' query parameter exists
    if (router.query.menu) {
      setActiveMenu(router.query.menu);
    }
  }, [router.query.menu]); // Reacting to changes in the 'menu' query parameter

  // Get the current menu based on the active state
  const currentMenu = config[activeMenu];

  const handleTabClick = (menuName) => {
    // Use the 'shallow' option to avoid full page reloads and maintain state
    router.push(`${menuName}`, undefined, { shallow: true });
  };

  return (
    <Layout>
      <Hero imageUrl={currentMenu?.imageUrl} title="PARTY MENU" size="md" />
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

          {/* Menu Display */}
          <div className="my-10 p-8 md:px-20 pt-0 w-full">
            <div className="m-1 flex justify-center flex-col w-full mx-auto text-primary">
              {/* Dynamically Rendered Menu Title */}
              {/* <h1 className="font-bold text-4xl mb-1">{currentMenu?.title}</h1> */}
              <h1 className=" font-bold text-4xl mb-1">PARTY PLATTERS:</h1>
              <h4 className=" ml-0.5 font-bold text-md">
                All platters serve 8-10 guests each.
              </h4>
              <h4 className="text-black italic ml-0.5 font-normal text-md mb-4">
                Pricing is subject to change.
              </h4>
              {/* Tab Menu */}
              <div className="flex justify-center my-4 flex-wrap">
                <button
                  className={`px-4 py-2 ${
                    activeMenu === 'menu'
                      ? 'bg-primary text-white'
                      : 'bg-transparent'
                  }`}
                  onClick={() => handleTabClick('menu?menu=menu')}
                >
                  Clifton Park
                </button>
                <button
                  className={`px-4 py-2 ${
                    activeMenu === 'menuNorthgreenbush'
                      ? 'bg-primary text-white'
                      : 'bg-transparent'
                  }`}
                  onClick={() => handleTabClick('menu?menu=menuNorthgreenbush')}
                >
                  North Greenbush
                </button>
                <button
                  className={`px-4 py-2 ${
                    activeMenu === 'menuNewhartford'
                      ? 'bg-primary text-white'
                      : 'bg-transparent'
                  }`}
                  onClick={() => handleTabClick('menu?menu=menuNewhartford')}
                >
                  New Hartford
                </button>
                <button
                  className={`px-4 py-2 ${
                    activeMenu === 'menuSaratoga'
                      ? 'bg-primary text-white'
                      : 'bg-transparent'
                  }`}
                  onClick={() => handleTabClick('menu?menu=menuSaratoga')}
                >
                  Saratoga
                </button>
                <button
                  className={`px-4 py-2 ${
                    activeMenu === 'menuMohawkharbor'
                      ? 'bg-primary text-white'
                      : 'bg-transparent'
                  }`}
                  onClick={() => handleTabClick('menu?menu=menuMohawkharbor')}
                >
                  Mohawk Harbor
                </button>
								<button
                  className={`px-4 py-2 ${
                    activeMenu === 'menuLatham'
                      ? 'bg-primary text-white'
                      : 'bg-transparent'
                  }`}
                  onClick={() => handleTabClick('menu?menu=menuLatham')}
                >
                  Latham
                </button>
              </div>
              <div className="flex flex-wrap justify-center items-start text-white">
                {currentMenu?.items?.map((option, index) => (
                  <div className="w-full sm:w-1/3 p-2" key={index}>
                    <MenuPlatterComponent
                      title={option?.title}
                      imageUrl={option?.imgUrl}
                      cost={option?.cost}
											qty={option?.qty}
											desc={option?.desc}
                    />
                  </div>
                ))}

                {currentMenu?.wingFlavors?.length ? <div className="w-full text-center text-black p-2">
                 <span className="font-bold">Wing flavors:</span> {currentMenu?.wingFlavors.join(', ')}
                </div> : null}

								{currentMenu?.pizzaToppings?.length ? <div className="w-full text-center text-black p-2">
								<span className="font-bold">Pizzas:</span> {currentMenu?.pizzaToppings.join(', ')}
                </div> : null}

                {/* Dynamic Extras based on Menu */}
                <div className="text-primary">
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
                      {config?.menu?.drinks?.map((drink, index) => {
                        return (
                          <div
                            key={index}
                            className="w-full flex flex-wrap my-2"
                          >
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
              </div>{' '}
            </div>
          </div>
        </div>
      </div>

      <Modal onClose={() => setShowMenuModal(false)} isOpen={showMenuModal}>
        <iframe
          src={'/BottleServiceMenu.pdf'}
          width="100%"
          height="800"
          style={{ border: 'none' }}
          title="PDF Viewer"
        ></iframe>
      </Modal>
    </Layout>
  );
}

export default Menu;
