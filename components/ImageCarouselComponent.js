import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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
    <div className="relative h-[200px] md:h-[400px] overflow-hidden m-2 md:m-8">
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ${
          isSliding
            ? direction === 'next'
              ? 'translate-x-full'
              : '-translate-x-full'
            : ''
        }`}
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
      />
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
