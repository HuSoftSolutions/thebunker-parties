import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { navigationItems } from './navigation';

const getLinkComponent = (navitem) => {
  const { pathname } = useRouter();

  const style = pathname === navitem.to ? 'text-secondary' : '';

  return (
    <Link href={navitem.to} className="block py-2">
      <span className={`block py-2 hover:text-primary ${style}`}>
        {navitem.title}
      </span>
    </Link>
  );
};

const getDropdownComponent = (navitem) => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const style = router.pathname === navitem.to ? 'text-secondary' : '';

  const toggle = () => {
    setShow(!show);
  };

  return (
    <div className="w-full">
      <div className="py-2 text-left focus:outline-none flex items-center w-full justify-center ml-3 md:ml-0 md:justify-start cursor-pointer hover:text-primary">
        <span className={`${style}`} onClick={() => router.push(navitem.to)}>
          {navitem.title}
        </span>
        <MdKeyboardArrowDown
          className={`text-primary w-8 h-8 ${show ? 'rotate-180' : ''}`}
          onClick={toggle}
        />
      </div>
      <div
        className={`${style} overflow-hidden transition-all ${
          show
            ? 'h-auto ease-in-out duration-300'
            : 'h-0 ease-in-out duration-200'
        }`}
      >
        {navitem.options.map((dropdownitem) => {
          return (
            <Link
              href={dropdownitem.to}
              className="block py-2 text-lg hover:text-primary"
              key={dropdownitem.id + 'desktop'}
            >
              {dropdownitem.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="hidden md:flex flex-col max-w-[240px] bg-black text-white font-extrabold text-xl sticky top-0 h-screen overflow-y-auto overflow-x-hidden">
      <div className="p-4">
        <Link href="/" className="text-xl font-bold">
          <img
            src="/Bunker_Trademarked_Desktop.png"
            width="100%"
            className="w-5/6 mx-auto"
          />
        </Link>
      </div>
      <div className="p-4 flex flex-col items-start justify-start h-fit ml-9">
        {navigationItems.map((navitem) => {
          switch (navitem.type) {
            case 'link':
              return (
                <div key={navitem.id + 'mbl'}>{getLinkComponent(navitem)}</div>
              );
            case 'dropdown':
              return (
                <div key={navitem.id + 'mbl'}>
                  {getDropdownComponent(navitem, null)}
                </div>
              );
          }
          return null;
        })}
      </div>
      <div className="p-4 w-full justify-start flex ml-8">
        <a
          href="https://www.facebook.com/getinthebunkerNY"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="hover:text-blue-600 w-8 h-8 inline-block mr-3" />
        </a>
        <a
          href="https://www.instagram.com/getinthebunker/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="hover:text-red-600 w-8 h-8 inline-block" />
        </a>
      </div>
    </div>
  );
};

const MobileNavBar = ({ open, toggle }) => {
  const router = useRouter();

  return (
    <div className="md:hidden bg-black text-white p-4 flex items-center justify-between h-[65px]">
      <img
				src="Bunker_Trademarked_Mobile.png"
        className="p-1 cursor-pointer"
        style={{ maxWidth: '170px' }}
        onClick={() => {
          router.push('/');
        }}
      />
      {open ? null : (
        <FiMenu className="w-8 h-8 cursor-pointer" onClick={toggle} />
      )}
    </div>
  );
};

const MobileNavBarNavigation = ({ open, toggle }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-90 transition-opacity ${
        open ? 'visible' : 'invisible'
      }`}
    >
      <div className="text-white absolute right-0 top-0 p-4">
        <FiX className="w-8 h-8 cursor-pointer" onClick={toggle} />
      </div>
      <div className="flex flex-col h-full w-full text-center justify-start mt-20 text-white">
        {navigationItems.map((navitem) => {
          switch (navitem.type) {
            case 'link':
              return (
                <div key={navitem.id + 'mobile'}>
                  {getLinkComponent(navitem)}
                </div>
              );
            case 'dropdown':
              return (
                <div key={navitem.id + 'mobile'}>
                  {getDropdownComponent(navitem)}
                </div>
              );
          }
          return null;
        })}
      </div>
    </div>
  );
};

const Layout = ({ children, bg }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const { asPath } = useRouter();

  useEffect(() => {
    setIsNavOpen(false);
  }, [asPath]);

  return (
    <div className={`flex h-full ${bg || ''}`}>
      {/* <Sidebar /> */}
      {Sidebar()}
      <div className="w-full h-full">
        <MobileNavBar open={isNavOpen} toggle={toggleNav} />
        <div className="p-0">{children}</div>
        <MobileNavBarNavigation open={isNavOpen} toggle={toggleNav} />
      </div>
    </div>
  );
};

export default Layout;
