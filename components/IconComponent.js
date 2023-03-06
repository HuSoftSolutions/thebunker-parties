import React from 'react';

function IconComponent({ icon, title }) {
  return (
    <div className="flex flex-col items-center justify-center w-[110px] h-[110px] m-1 text-primary font-bold ">
      <div className="w-[50px] h-[50px] mb-1">{icon}</div>
      <div className="">{title}</div>
    </div>
  );
}

export default IconComponent;
