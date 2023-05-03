import { render, screen } from '@testing-library/react';
import Type from '../Type';
import { server } from '../../../mocks/server';
import { rest } from 'msw';
test('display product images from server', async () => {
  render(<Type orderType='products' />);

  const productImages = await screen.findAllByRole('img', {
    name: /product$/i,
  });

  expect(productImages).toHaveLength(2);

  const altText = productImages.map((element) => element.alt);
  expect(altText).toEqual(['America product', 'England product']);
});

test('서버에서 데이터를 받을 때 에러가 나는 경우', async () => {
  server.resetHandlers(
    rest.get('http://localhost:7001/products', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<Type orderType='products' />);
  const errorBanner = await screen.findByTestId('error-banner');

  expect(errorBanner).toHaveTextContent(
    '에러가 발생했습니다. 다시 시도해주세요.'
  );
});

test('옵션을 서버로부터 받아온다', async () => {
  render(<Type orderType='options' />);

  const optionCheckboxes = await screen.findAllByRole('checkbox');
  expect(optionCheckboxes).toHaveLength(2);
});
