import React from 'react';
import Login from '../Login';
import { mount } from 'cypress-react-unit-test';

describe('form', () => {
  it('submits username and password', () => {
    const username = 'me';
    const password = 'please';
    const onSubmit = cy.stub();
    mount(<Login onSubmit={onSubmit} />);

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
});
