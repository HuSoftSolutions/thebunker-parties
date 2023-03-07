import React from 'react';

const BayCardComponent = ({ imageUrl, title, list, rate }) => {
  return (
    <div className="flex flex-col md:flex-row h-fit md:h-[275px] m-1 mb-10 border rounded-b-xl md:rounded-bl-none md:rounded-r-xl  font-bold shadow-xl">
      <div className="w-full md:w-2/3 flex items-center">
        <img
          src={imageUrl}
          className="h-[275px] w-full object-cover p-1"
          alt={title}
        />
      </div>
      <div className="w-full md:w-1/3 md:p-4 break-all	flex flex-col justify-between p-5">
        <h2 className="text-xl xl:text-2xl font-bold mb-2 text-primary">
          {title}
        </h2>
        <ul className="list-disc ml-5">
          {list?.map((item, index) => {
            return (
              <li key={index}>
                <p className="font-normal text-[12px] xl:text-lg">{item}</p>
              </li>
            );
          })}
        </ul>
        <p className="pt-3">${rate} per hour</p>
      </div>
    </div>
  );
};

export default BayCardComponent;
