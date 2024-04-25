/// <reference types="Cypress" />


describe('Sales Order List', () => {
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
  
    it('Open page at first time and switch to chart view', () => {         
    });

    it('Change filters of different data types and operators', () => {
    });

    it('Group by', () => {
    });

    it('Sort', () => {   
    });

    it('Show hide total', () => {

    });

    it('Save as, update and switch variant', () => {   
    });

    it('Set default variant', () => {
    });

    it('Pin variant and open tile', () => {
    });

})
  