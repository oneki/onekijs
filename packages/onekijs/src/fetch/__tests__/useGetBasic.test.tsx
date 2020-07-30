import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { render } from '../../__tests__/customRenderer';
import { successResponse } from '../../__tests__/mocks/responses';
import UseGetWidget, { textDisplay } from './helper/UseGetWidget';

it('it does a simple GET', async () => {
  const { getByTestId, findByTestId } = render(<UseGetWidget path="/success" />);

  await findByTestId('use-get-result');
  const resultElement = getByTestId('use-get-result');
  expect(resultElement).toHaveTextContent(textDisplay(successResponse));
});

it('it does a GET with params', async () => {
  const baseUrl = 'http://localhost';
  const path = '/echo/1?x=1';
  const { getByTestId, findByTestId } = render(<UseGetWidget baseUrl={baseUrl} path={path} />);

  await findByTestId('use-get-result');
  const resultElement = getByTestId('use-get-result');
  expect(resultElement).toHaveTextContent(textDisplay({ result: `${baseUrl}${path}` }));
});
