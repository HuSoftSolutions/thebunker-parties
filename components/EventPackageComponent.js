import React from 'react';

function EventPackageComponent({ title, list }) {
  return (
    <div className="m-1 my-3 mb-2 shadow-xl p-4 bg-white rounded-lg transform transition-transform hover:scale-105 h-full hover:bg-gray-200">
      <p className="font-bold text-md">{title}</p>
      <ul className="list-disc ml-5 text-sm">
        {list.map((item, index) => {
          return (
            <li key={index}>
              <p className="font-normal">{item}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default EventPackageComponent;
