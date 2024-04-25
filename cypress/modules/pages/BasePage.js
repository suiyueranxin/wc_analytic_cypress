import * as Global from '../common/Global';
import { Log } from '../util/Log';


class BasePage {

    constructor(url) {
        this.url =  Cypress.env('url') + url;
    }
    @Log('Open url')
    visit(time, error) {
        cy.visit(this.url).wait(time || Global.WAIT);
        if (Cypress.env('visiterror') && !error) {
            cy.get('#__mbox-btn-0', {timeout: 5000}).click({force: true});
        }
    }

    @Log('Back ')
    back() {
        cy.get('#backBtn').click();
        cy.wait(Global.WAIT);
    }

    @Log()
    navigateToHome() {
        cy.get('a#homeBtn').click();
        cy.wait(Global.WAIT);
    }

    @Log()
    revisit() {
        this.navigateToHome();
        this.visit(null, true);
    }
}

export default BasePage;