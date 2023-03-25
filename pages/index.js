import Head from 'next/head';
// import Image from "next/image";
import Layout from '@/components/Layout';
import Hero from '@/components/HeroComponent';
import Card from '@/components/BookingStepsComponent';
import { useRouter } from 'next/router';
import HeroVideoComponent from '@/components/HeroVideoComponent';
import Testimonials from '@/components/TestimonialComponent';
import config from '@/components/config.json';

function newImg() {
  return 'https://source.unsplash.com/random/1600x900';
}

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>PARTY AT THE BUNKER!</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="flex w-full h-full flex-col">
          <HeroVideoComponent
            imageUrl="https://res.cloudinary.com/dy3tzr2tc/video/upload/v1679543791/thebunkerparties/thebunker_home_video_e9kxwl.mp4"
            title="PARTY AT THE BUNKER!"
            message="Celebrations, corporate events, kids parties and more! Let us host your next event."
            btnTitle="SEE OUR LOCATIONS"
            btnClick={() => router.push('/location')}
            size="lg"
          />
          <div className="block w-full h-[100px]">
            <Testimonials testimonials={config?.testimonials} type="home" />
          </div>
          <hr />
          <div className="flex justify-center items-center flex-col p-4 md:p-8">
            <h1 className="text-2xl text-[35px] pb-5 md:pb-10 font-bold">
              BOOK YOUR EVENT
            </h1>
            <Card
              imgUrl="https://res.cloudinary.com/dy3tzr2tc/image/upload/v1678232145/thebunkerparties/Dining_Room_Patrons_Toast_Wide_zfdif4.jpg"
              title="STEP 1: WHERE TO PARTY?"
              message="All of our locations offer a variety of unique party packages and options to create the best event experience for any occasion. Visit our locations page for more information. If you already know the space you want, you're ready for Step 2!"
              onClick={() => {
                router.push('/location');
              }}
              btnTitle="SEE LOCATIONS & SPACES"
            />
            <Card
              imgUrl="https://res.cloudinary.com/dy3tzr2tc/image/upload/v1678232141/thebunkerparties/nh-png_pyj7nx.jpg"
              title="STEP 2: SCHEDULE YOUR PARTY"
              message="Let's get your party scheduled! Start the process by clicking the button below. This will lead you through a series of questions and event options regarding location, number of guests, date and more. Once submitted, our events coordinator will reach out to finalize the booking process."
              btnClick={() => {
                router.push('/event');
              }}
              btnTitle="BOOK NOW"
            />
            <Card
              imgUrl="https://res.cloudinary.com/dy3tzr2tc/image/upload/v1678232141/thebunkerparties/IMG_1368_nl3mja.jpg"
              title="STEP 3: FOOD & DRINKS"
              message="Ten days before your event, you'll receive a notification to order the food and drinks for your party. Follow the prompts to make your final selections and let us take care of the rest!"
              btnClick={() => {
                router.push('/event');
              }}
              btnTitle="VIEW MENUS"
            />
          </div>
        </main>
      </Layout>
    </>
  );
}
