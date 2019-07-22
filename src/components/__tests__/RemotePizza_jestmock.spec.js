// This line is only needed for CodeSandbox
import '../../../src/setupTests.js';

import React from 'react';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import RemotePizza from '../RemotePizza';
import { fetchIngredients } from '../../services';

jest.mock('../../services');

afterEach(() => {
  cleanup();
  fetchIngredients.mockReset();
});

const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

test('download ingredients from internets', async () => {
  expect.assertions(4);

  fetchIngredients.mockResolvedValue({ args: { ingredients } });

  const { getByText } = render(<RemotePizza />);

  fireEvent.click(getByText('Cook'));

  await wait(() => {
    ingredients.forEach(ingredient => {
      expect(getByText(ingredient)).toBeTruthy();
    });
  });
});
