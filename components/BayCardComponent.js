import React from 'react';

const BayCardComponent = ({ imageUrl, title, list, rate, detail }) => {
  return (
    <div className="flex flex-col xl:flex-row h-fit  m-1 mb-10 border rounded-b-xl xl:rounded-bl-none xl:rounded-r-xl  font-bold shadow-xl">
      {imageUrl ? <div className="w-full xl:w-2/3 flex items-center">
        <img
          src={imageUrl}
          className="h-full w-full object-cover p-1 aspect-video"
          alt={title}
        />
      </div> : null}
      <div className="w-full xl:w-1/3 xl:p-4 flex flex-col justify-between p-5">
        <h2 className="text-xl xl:text-2xl font-bold mb-0 text-primary uppercase">
          {title}
        </h2>
        {detail !== null && (
          <p className="text-sm text-black font-bold">{detail}</p>
        )}
        <ul className="list-disc ml-5  xl:h-full flex flex-col my-4">
          {list?.map((item, index) => {
            return (
              <li key={index}>
                <p className="font-normal text-xs xl:text-sm">{item}</p>
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
