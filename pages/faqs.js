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

function FAQ() {
  const router = useRouter();

  return (
    <Layout>
      <Hero imageUrl={config?.faqs?.imageUrl} title="FAQs" size="md" />
      <div className="my-10 p-8 md:px-20 pt-0 w-full">
        <div className="m-1 flex justify-center flex-col w-full mx-auto text-primary">
          <div className="flex flex-wrap justify-center text-black">
            {config?.faqs?.questions.map((item, index) => {
              return (
                <div
                  className="w-full m-1 border-b last:border-none py-4"
                  key={index}
                >
                  <div className="text-primary font-bold p-1">
                    {item.question}
                  </div>
                  <div className="p-1">{item.answer}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default FAQ;
