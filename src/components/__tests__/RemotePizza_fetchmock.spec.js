// This line is only needed for CodeSandbox
import '../../../src/setupTests.js';

import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import RemotePizza from '../RemotePizza';

const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

afterAll(() => {
  fetchMock.restore();
});

test('download ingredients from internets', async () => {
  expect.assertions(4);

  fetchMock.restore().mock(/https:\/\/httpbin.org\/anything\?.*/, {
    body: { args: { ingredients } },
  });

  const { getByText } = render(<RemotePizza />);

  fireEvent.click(getByText(/cook/i));

  await wait(() => {
    ingredients.forEach(ingredient => {
      expect(getByText(ingredient)).toBeTruthy();
    });
  });
});
