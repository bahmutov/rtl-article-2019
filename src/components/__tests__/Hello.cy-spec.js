import React from 'react';
import { mount } from 'cypress-react-unit-test';

it('hello world', () => {
  mount(<p>Hello Jest!</p>);
  cy.contains('Hello Jest!');
  // or use @testing-library/cypress command
  cy.log('**@testing-library/cypress**');
  cy.findByText('Hello Jest!');
});
