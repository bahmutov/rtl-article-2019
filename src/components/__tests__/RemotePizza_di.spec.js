// This line is only needed for CodeSandbox
// import '../../../src/setupTests.js';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RemotePizza from '../RemotePizza';

const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

test('download ingredients from internets', async () => {
  expect.assertions(4);

  const fetchIngredients = () =>
    Promise.resolve({
      args: { ingredients },
    });
  const { getByText, findByText } = render(
    <RemotePizza fetchIngredients={fetchIngredients} />
  );

  fireEvent.click(getByText(/cook/i));

  for (const ingredient of ingredients) {
    expect(await findByText(ingredient)).toBeInTheDocument();
  }
});
