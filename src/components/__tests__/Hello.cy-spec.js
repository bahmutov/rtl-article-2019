import React from 'react';
import { mount } from 'cypress-react-unit-test';

it('hello world', () => {
  mount(<p>Hello Jest!</p>);
  // cy.contains('Hello Jest!');
  // or use @testing-library/cypress command
  // cy.log('**@testing-library/cypress**');
  cy.findByText('Hello Jest!');
});

it('hello world component', () => {
  // the Command Log will show "<HelloWorld>" instead of "<Unknown>"
  const HelloWorld = () => <p>Hello Jest!</p>;
  mount(<HelloWorld />);
  cy.contains('Hello Jest!');
  // or use @testing-library/cypress command
  cy.log('**@testing-library/cypress**');
  cy.findByText('Hello Jest!');
});

it.skip('fails if text is not found', () => {
  const HelloWorld = () => <p>Hello Jest!</p>;
  mount(<HelloWorld />);
  cy.contains('Hello Mocha!');
});

it.skip('fails if text is not found after 200ms', () => {
  // the Command Log will show "<HelloWorld>" instead of "<Unknown>"
  const HelloWorld = () => <p>Hello Jest!</p>;
  mount(<HelloWorld />);
  cy.contains('Hello Mocha!', { timeout: 200 });
});
