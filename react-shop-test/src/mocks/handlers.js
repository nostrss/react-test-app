import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:7001/products', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: 'America',
          imagePath: '/images/america.jpg',
        },
        {
          name: 'England',
          imagePath: '/images/england.jpg',
        },
      ])
    );
  }),
  rest.get('http://localhost:7001/options', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: 'Insurance',
        },
        { name: 'Dinner' },
      ])
    );
  }),
];
