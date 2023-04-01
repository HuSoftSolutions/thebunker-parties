import { useState, useEffect } from 'react';
import cn from 'classnames';

const Testimonials = ({ testimonials, type, color = 'light' }) => {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  const textColor = color === 'light' ? 'text-black' : 'text-white';

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveTestimonialIndex(
        (activeTestimonialIndex + 1) %
          testimonials.filter((t) => t.category.includes(type)).length
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, [activeTestimonialIndex]);

  return (
    <div className="relative h-full">
      {testimonials
        .filter((t) => t.category.includes(type))
        .map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={cn(
              'absolute top-0 left-0 w-full h-full transition-opacity duration-1000',
              {
                'opacity-100': activeTestimonialIndex === index,
                'opacity-0': activeTestimonialIndex !== index,
              }
            )}
          >
            <div
              className={`flex p-4 py-6 ${textColor} justify-center items-center h-full`}
            >
              <p className="text-md sm:text-lg  italic font-medium text-center">
                "{testimonial.quote}"
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Testimonials;
