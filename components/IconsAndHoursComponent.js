import React from 'react';
import { CgPin } from 'react-icons/cg';
import { GiKnifeFork } from 'react-icons/gi';
import IconComponent from '@/components/IconComponent';
import { useRouter } from 'next/router';

const IconsAndHours = ({ locObj, mapClick, mapClose }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="flex">
        <IconComponent
          click={mapClick}
          close={mapClose}
          title="DIRECTIONS"
          icon={<CgPin className="w-full h-full" />}
        />
        <IconComponent
          title="MENU"
          icon={<GiKnifeFork className="w-full h-full" />}
          click={() => {
            router.push('/menu');
          }}
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
