import React from 'react';
import ExpandCollapse from '../ExpandCollapse';
import { mount } from 'cypress-react-unit-test';

it('button expands and collapses the content', () => {
  const children = 'Hello world';
  mount(
    <ExpandCollapse excerpt="Information about dogs">{children}</ExpandCollapse>
  );

  cy.findByText(children).should('not.exist');
  cy.findByRole('button', { name: /expand/i }).click();
  cy.findByText(children); // should exist assertion is built-in
  cy.findByRole('button', { name: /collapse/i }).click();
  cy.findByText(children).should('not.exist');
});

it('button expands and collapses the content (Cypress commands)', () => {
  const children = 'Hello world';
  mount(
    <ExpandCollapse excerpt="Information about dogs">{children}</ExpandCollapse>
  );

  // use built-in Cypress commands
  // https://on.cypress.io/api
  cy.contains('Hello world').should('not.exist');
  cy.contains('button', /expand/i).click();
  cy.contains('Hello world').should('be.visible');
  cy.contains('button', /collapse/i).click();
  cy.contains('Hello world').should('not.exist');
});
