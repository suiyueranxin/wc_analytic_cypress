/// <reference types="Cypress" />


describe('Sales Order Embedded Chart', () => {
    before(() => {
        // cy.visit('/', {timeout: 10000})
        // cy.get('#companyselect').select('US_I073369_2525_05_13')
        // cy.get('#username').clear().type('manager')
        // cy.get('#password').type('manager{enter}')
        cy.fixture('user').then(user => {
            cy.login(user.super)
        }); 
    });

    beforeEach(() => {

    });
  
    it('Switch chart type', () => {         
    });

    it('Measure and dimension selector, disable logic about line field', () => {
    });

    it('Group by item map to dimension selector', () => {
    });

    it('Save as, update and switch variant', () => {   
    });

    it('Set default variant', () => {
    });

    it('Pin variant, check different chart types, bindings, show/hide legends, filters', () => {
    });
})
  