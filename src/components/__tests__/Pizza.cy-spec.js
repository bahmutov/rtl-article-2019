import React from 'react';
import { mount } from 'cypress-react-unit-test';
import Pizza from '../Pizza';

it('contains all ingredients', () => {
  const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];
  mount(<Pizza ingredients={ingredients} />);

  for (const ingredient of ingredients) {
    cy.findByText(ingredient);
  }
});
