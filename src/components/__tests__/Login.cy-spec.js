import React from 'react';
import Login from '../Login';
import { mount } from 'cypress-react-unit-test';

it('submits username and password', () => {
  const username = 'me';
  const password = 'please';
  const onSubmit = cy.stub();
  mount(<Login onSubmit={onSubmit} />);

  cy.get('[data-testid=loginForm-username]').type(username);
  cy.get('[data-testid=loginForm-password]').type(password);
  cy.contains('button', /log in/i).click();
  cy.wrap(onSubmit).should('have.been.calledOnce').and('have.been.calledWith', {
    username,
    password,
  });
});
