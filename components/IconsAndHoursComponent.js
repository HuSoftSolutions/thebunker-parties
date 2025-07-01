import IconComponent from '@/components/IconComponent';
import { useRouter } from 'next/router';
import { CgPin } from 'react-icons/cg';
import { GiKnifeFork } from 'react-icons/gi';

const IconsAndHours = ({ locObj, mapClick, mapClose }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between h-full">
      <div className="flex">
        <IconComponent
          click={mapClick}
          close={mapClose}
          title="DIRECTIONS"
          icon={<CgPin className="w-full h-full" />}
        />
       {locObj?.menuPath !== 'hide' ? <IconComponent
          title="MENU"
          icon={<GiKnifeFork className="w-full h-full" />}
          click={() => {
            router.push(locObj.menuPath || "/menu");
          }}
        /> : null }
      </div>

			{locObj?.menuPath === 'hide' ? 
			<div>
				<div className="text-primary text-xs sm:text-sm bg-red-50 p-3 my-5 rounded text-center font-bold w-full h-full">Outside catering available</div>
			</div> : null}

      <div className="font-normal text-black">
        {/* <div>
          <span className="text-primary font-bold">HOURS:</span>{' '}
          <span>{locObj?.hours}</span>
        </div> */}
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
