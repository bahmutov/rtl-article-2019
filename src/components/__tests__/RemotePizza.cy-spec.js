import React from 'react';
import RemotePizza from '../RemotePizza';
import { mount } from 'cypress-react-unit-test';
// prepare for import mocking
import * as services from '../../services';

const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

describe('RemotePizza', () => {
  it('stubs via prop (di)', () => {
    const fetchIngredients = cy.stub().resolves({ args: { ingredients } });
    mount(<RemotePizza fetchIngredients={fetchIngredients} />);
    cy.contains('button', /cook/i).click();

    for (const ingredient of ingredients) {
      cy.contains(ingredient);
    }
  });

  it('stubs via prop (di with delay)', () => {
    const fetchIngredients = cy
      .stub()
      // resolves after 1 second delay
      .resolves(Cypress.Promise.resolve({ args: { ingredients } }).delay(1000));
    mount(<RemotePizza fetchIngredients={fetchIngredients} />);
    cy.contains('button', /cook/i).click();

    for (const ingredient of ingredients) {
      cy.contains(ingredient);
    }
  });

  it('download ingredients from internets (network mock)', () => {
    cy.server();
    cy.route('https://httpbin.org/anything*', { args: { ingredients } }).as(
      'pizza'
    );

    mount(<RemotePizza />);
    cy.contains('button', /cook/i).click();
    cy.wait('@pizza'); // make sure the network stub was used

    for (const ingredient of ingredients) {
      cy.contains(ingredient);
    }
  });

  it('download ingredients from internets (slow network mock)', () => {
    cy.server();
    cy.route({
      url: 'https://httpbin.org/anything*',
      response: { args: { ingredients } },
      delay: 1000,
    }).as('pizza');

    mount(<RemotePizza />);
    cy.contains('button', /cook/i).click();
    cy.wait('@pizza'); // make sure the network stub was used

    for (const ingredient of ingredients) {
      cy.contains(ingredient);
    }
  });

  it('mocks named import from services', () => {
    cy.stub(services, 'fetchIngredients').resolves({ args: { ingredients } });
    mount(<RemotePizza />);
    cy.contains('button', /cook/i).click();

    for (const ingredient of ingredients) {
      cy.contains(ingredient);
    }
  });

  it('mocks method via defaultProps', () => {
    cy.stub(RemotePizza.defaultProps, 'fetchIngredients').resolves({
      args: { ingredients },
    });
    mount(<RemotePizza />);
    cy.contains('button', /cook/i).click();

    for (const ingredient of ingredients) {
      cy.contains(ingredient);
    }
  });
});
