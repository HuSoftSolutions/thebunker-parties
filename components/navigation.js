export const navigationItems = [
  {
    id: 1,
    title: 'LOCATIONS',
    type: 'dropdown',
    to: '/location',
    options: [
      {
        title: 'Clifton Park',
        to: '/location/cliftonpark',
        id: 7,
      },
      {
        title: 'Guilderland',
        to: '/location/guilderland',
        id: 8,
      },
      {
        title: 'North Greenbush',
        to: '/location/northgreenbush',
        id: 9,
      },
      {
        title: 'New Hartford',
        to: '/location/newhartford',
        id: 10,
      },
    ],
  },
  {
    id: 2,
    title: 'MENU',
    to: '/menu',
    type: 'link',
  },
  {
    id: 3,
    title: 'GALLERY',
    to: '/gallery',
    type: 'link',
  },
  {
    id: 4,
    title: 'FAQs',
    to: '/faqs',
    type: 'link',
  },
  {
    id: 5,
    title: 'BOOK NOW',
    to: '/',
    type: 'link',
  },
  {
    id: 6,
    title: 'CONTACT',
    to: '/contact',
    type: 'link',
  },
];
