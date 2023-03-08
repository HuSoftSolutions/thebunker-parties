import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';

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
    <div className="relative h-[200px] md:h-[400px] overflow-hidden m-1">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      ))}
      <button
        className="absolute top-0 bottom-0 left-0 w-[50px] bg-black opacity-50 hover:opacity-75 flex justify-center items-center text-white text-2xl"
        onClick={handlePrevClick}
      >
        <FiChevronLeft />
      </button>
      <button
        className="absolute top-0 bottom-0 right-0 w-[50px] bg-black opacity-50 hover:opacity-75 flex justify-center items-center text-white text-2xl"
        onClick={handleNextClick}
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default ImageCarousel;
