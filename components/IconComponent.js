import React from 'react';

function IconComponent({ icon, title, click }) {
  return (
    <div
      onClick={click}
      className="flex flex-col items-center justify-center w-[110px] h-[110px] m-1 text-primary font-bold cursor-pointer"
    >
      <div className="w-[50px] h-[50px] mb-1">{icon}</div>
      <div className="">{title}</div>
    </div>
  );
}

export default IconComponent;
