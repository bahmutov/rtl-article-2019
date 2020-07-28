import React from 'react';
import { mount } from 'cypress-react-unit-test';

it('hello world', () => {
  mount(<p>Hello Jest!</p>);
  cy.contains('Hello Jest!');
});
