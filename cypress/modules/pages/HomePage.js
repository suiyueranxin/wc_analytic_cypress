import BasePage from './BasePage'

class HomePage extends BasePage {
    constructor() {
        super("/webx/index.html#Shell-home")
    }

    checkEmptyGroup(group) {
        cy.get('.sapUshellTileContainerContent:has(h2[aria-label*="'+group+'"]) ul li[aria-label^="Empty group"]');
    }

    openTile(name) {
        cy.get('.sapUshellTileWrapper:has(span[id$="title-inner"]:contains("'+name+'"))').last().click();
    }

    removeTile(name) {
        cy.get('.sapUshellTileWrapper:has(span[id$="title-inner"]:contains("'+name+'")) div.sapUshellTileDeleteClickArea').last().click();
    }
}

export default HomePage;