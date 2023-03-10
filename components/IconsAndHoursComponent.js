import React from 'react';
import { CgPin } from 'react-icons/cg';
import { GiKnifeFork } from 'react-icons/gi';
import IconComponent from '@/components/IconComponent';

const IconsAndHours = ({ locObj }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="flex">
        <IconComponent
          title="DIRECTIONS"
          icon={<CgPin className="w-full h-full" />}
        />
        <IconComponent
          title="MENU"
          icon={<GiKnifeFork className="w-full h-full" />}
        />
      </div>

      <div className="font-normal text-black">
        <div>
          <span className="text-primary font-bold">HOURS:</span>{' '}
          <span>{locObj?.hours}</span>
        </div>
        <div>
          <span className="text-primary font-bold">PHONE:</span>{' '}
          <span>{locObj?.phone}</span>
        </div>
        <div>
          <span className="text-primary font-bold">ADDRESS:</span>{' '}
          <span>{locObj?.address}</span>
        </div>
      </div>
    </div>
  );
};

export default IconsAndHours;
