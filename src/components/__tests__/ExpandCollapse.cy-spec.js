import React from 'react';
import ExpandCollapse from '../ExpandCollapse';
import { mount } from 'cypress-react-unit-test';

it('button expands and collapses the content', () => {
  const children = 'Hello world';
  mount(
    <ExpandCollapse excerpt="Information about dogs">{children}</ExpandCollapse>
  );

  cy.contains('Hello world').should('not.exist');

  cy.contains('button', /expand/i).click();

  cy.contains('Hello world').should('be.visible');

  cy.contains('button', /collapse/i).click();

  cy.contains('Hello world').should('not.exist');

  // expect(queryByText(children)).not.toBeTruthy();

  // fireEvent.click(getByRole('button', { name: /expand/i }));

  // expect(queryByText(children)).toBeTruthy();

  // fireEvent.click(getByRole('button', { name: /collapse/i }));

  // expect(queryByText(children)).not.toBeTruthy();
});
