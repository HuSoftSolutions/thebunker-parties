
import Head from 'next/head';
// import Image from "next/image";
import Layout from '@/components/Layout';
import Hero from '@/components/HeroComponent';
import Card from '@/components/BookingStepsComponent';
import { useRouter } from 'next/router';
import HeroVideoComponent from '@/components/HeroVideoComponent';
import Testimonials from '@/components/TestimonialComponent';
import config from '@/components/config.json';
import useWindowWidth from '@/hooks/useWindowDimensions';

function newImg() {
  return 'https://source.unsplash.com/random/1600x900';
}

export default function Home() {
  const router = useRouter();
	const { width } = useWindowWidth();
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
            imageUrl={width > 768 ? 'https://storage.googleapis.com/thebunker-assets/thebunker/Cloudinary_Archive_2024/Bunker_Homepage_Video_1920x1080_gpvxcs.mp4' : 'https://storage.googleapis.com/thebunker-assets/thebunker/Cloudinary_Archive_2024/Bunker_Homepage_Video_Mobile_mklz5z.mp4'}
            title="PARTY AT THE BUNKER!"
            message="Celebrations, corporate events and more! Let us host your next event."
            btnTitle="SEE OUR LOCATIONS"
            btnClick={() => router.push('/location')}
            size="lg"
          />
          <div className="block w-full h-[250px]">
            <Testimonials testimonials={config?.testimonials} type="home" />
          </div>
          <hr />
          <div className="flex justify-center items-center flex-col p-4 md:p-8">
            <h1 className="text-2xl text-[35px] pb-5 md:pb-10 font-bold">
              BOOK YOUR EVENT
            </h1>

						<Card
              imgUrl="https://storage.googleapis.com/thebunker-assets/thebunker/Cloudinary_Archive_2024/nh-png_pyj7nx.jpg"
              title="SCHEDULE YOUR PARTY"
              message="Let's get your party scheduled! Start the process by clicking the button below. This will lead you through a series of questions and event options regarding location, number of guests, date and more. Once submitted, our events coordinator will reach out to finalize the booking process."
              onClick={() => {
                router.push(
                  'https://thebunker.tripleseat.com/party_request/31049'
                );
              }}
              btnTitle="START PLANNING"
            />
            <Card
              imgUrl="https://storage.googleapis.com/thebunker-assets/thebunker/Cloudinary_Archive_2024/Dining_Room_Patrons_Toast_Wide_zfdif4.jpg"
              title="WHERE TO PARTY?"
              message="All of our locations offer a variety of unique party packages and options to create the best event experience for any occasion. Visit our locations page for more information. If you already know the space you want, you're ready for Step 2!"
              onClick={() => {
                router.push('/location');
              }}
              btnTitle="SEE LOCATIONS & SPACES"
            />

            <Card
              imgUrl="https://storage.googleapis.com/thebunker-assets/thebunker/Cloudinary_Archive_2024/IMG_1368_nl3mja.jpg"
              title="FOOD & DRINKS"
              message="Ten days before your event, you'll receive a notification to order the food and drinks for your party. Follow the prompts to make your final selections and let us take care of the rest!"
              onClick={() => {
                router.push('/menu');
              }}
              btnTitle="VIEW MENUS"
            />
          </div>
        </main>
      </Layout>
    </>
  );
}
