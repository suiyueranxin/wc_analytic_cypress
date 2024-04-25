/// <reference types="Cypress" />
import HomePage from "../../../modules/pages/HomePage"

describe('Without authentication', () => {
    it('Log on no auth user', () => {
        cy.fixture('user').then(user => {
            cy.login(user.noAuth);
        });

        let home = new HomePage();
        home.checkEmptyGroup('Analytics');

    })
})