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
      },
      {
        title: 'Guilderland',
        to: '/location/guilderland',
      },
      {
        title: 'North Greenbush',
        to: '/location/northgreenbush',
      },
      {
        title: 'New Hartford',
        to: '/location/newhartford',
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
    to: '/book-now',
    type: 'link',
  },
  {
    id: 6,
    title: 'CONTACT',
    to: '/contact',
    type: 'link',
  },
];
