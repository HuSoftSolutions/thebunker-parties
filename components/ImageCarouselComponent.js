import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const ImageCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [direction, setDirection] = useState(null);

  const handleNextClick = () => {
    if (!isSliding) {
      setIsSliding(true);
      setDirection('next');

      setTimeout(() => {
        setCurrentImageIndex(
          currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
        );
        setIsSliding(false);
      }, 500);
    }
  };

  const handlePrevClick = () => {
    if (!isSliding) {
      setIsSliding(true);
      setDirection('prev');

      setTimeout(() => {
        setCurrentImageIndex(
          currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
        );
        setIsSliding(false);
      }, 500);
    }
  };

  return (
    <div className="w-full h-fit">
      <Carousel infiniteLoop>
        {images.map((image, index) => (
          <div className="h-[300px] md:h-[400px] lg:h-[600px] xl:h-[700px] object-cover">
            <img src={image} className=" h-full w-full" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
