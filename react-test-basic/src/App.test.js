import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('the counter starts at 0', () => {
  render(<App />);
  // screen object를 이용해서 원하는 엘레멘트에 접근(접근할때는 ID로)
  const counterElement = screen.getByTestId('counter');
  expect(counterElement).toHaveTextContent(0);
});

test('minus button has correct text', () => {
  render(<App />);
  const minusButtonElement = screen.getByTestId('minus-button');
  expect(minusButtonElement).toHaveTextContent('-');
});

test('plus button has correct text', () => {
  render(<App />);
  const plusButtonElement = screen.getByTestId('plus-button');
  expect(plusButtonElement).toHaveTextContent('+');
});

test('when the + button is clicked, the counter changes to 1', () => {
  render(<App />);
  const plusButtonElement = screen.getByTestId('plus-button');
  fireEvent.click(plusButtonElement);

  const counterElement = screen.getByTestId('counter');
  expect(counterElement).toHaveTextContent(1);
});

test('when the - button is clicked, the counter changes to -1', () => {
  render(<App />);
  const plusButtonElement = screen.getByTestId('minus-button');
  fireEvent.click(plusButtonElement);

  const counterElement = screen.getByTestId('counter');
  expect(counterElement).toHaveTextContent(-1);
});

test('on/off button has blue color', () => {
  render(<App />);
  const onOffButtonElement = screen.getByTestId('on-off-button');
  expect(onOffButtonElement).toHaveStyle({ backgroundColor: 'blue' });
});

test('prevent the -,+ button from being clicked when the on/off button is clicked', () => {
  render(<App />);
  const onOffButtonElement = screen.getByTestId('on-off-button');
  fireEvent.click(onOffButtonElement);

  const plusButtonElement = screen.getByTestId('plus-button');

  expect(plusButtonElement).toBeDisabled();
});
