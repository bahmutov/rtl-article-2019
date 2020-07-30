import React from 'react';
import Login from '../Login';
import { mount } from 'cypress-react-unit-test';

describe('form', () => {
  it('submits username and password', () => {
    const username = 'me';
    const password = 'please';
    const onSubmit = cy.stub();
    mount(<Login onSubmit={onSubmit} />);

    // using Cypress built-in commands and
    // selectors suggested by the Selector Playground
    // https://on.cypress.io/selector-playground
    cy.get('[data-testid=loginForm-username]').type(username);
    cy.get('[data-testid=loginForm-password]').type(password);
    cy.contains('button', /log in/i).click();
    cy.wrap(onSubmit)
      .should('have.been.calledOnce')
      .and('have.been.calledWith', {
        username,
        password,
      });
  });

  it('submits username and password using testing-library', () => {
    const username = 'me';
    const password = 'please';
    const onSubmit = cy.stub();
    mount(<Login onSubmit={onSubmit} />);

    cy.findByLabelText(/username/i).type(username);
    cy.findByLabelText(/password/i).type(password);
    cy.findByRole('button', { name: /log in/i })
      .click()
      .then(() => {
        // use explicit assertion using sinon-chai matchers
        /* eslint-disable-next-line no-unused-expressions */
        expect(onSubmit).to.be.calledOnce;
        expect(onSubmit).to.be.calledWith({
          username,
          password,
        });
      });
  });

  it('submits username and password using testing-library (BDD assertions)', () => {
    const username = 'me';
    const password = 'please';
    // create a stub and save under an alias
    mount(<Login onSubmit={cy.stub().as('submit')} />);

    cy.findByLabelText(/username/i).type(username);
    cy.findByLabelText(/password/i).type(password);
    cy.findByRole('button', {
      name: /log in/i,
    }).click();

    cy.get('@submit')
      .should('be.calledOnce')
      // .and is an alias to .should
      .and('calledWith', {
        username,
        password,
      });
  });
});
