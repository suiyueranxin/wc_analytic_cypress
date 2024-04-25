import * as ChartType from '../analytics/ChartType'

class ActionBar {
    constructor() {
        this.rootPath = 'div.sapSuiteUiCommonsChartContainerToolBarArea';
    }
    
    /********************************************************************
     * check points
    ********************************************************************/
   checkTotal(chartType) {
        if (chartType != ChartType.TABLE) {
            cy.get(this.rootPath + ' span[id$="dataset_sum"]').toMatchDomTextSnapShot();
            cy.get(this.rootPath + ' div[id*="details"] span.sapMBtnContent').toMatchDomTextSnapShot();
        } else {
            cy.get(this.rootPath + ' span[id$="dataset_sum"]').should('not.be.visible');
            cy.get(this.rootPath + ' div[id*="details"] span.sapMBtnContent').should('not.be.visible')
        }
    }

    checkDetails() {
        cy.get('div[id*=details] .sapMLIBContent:eq(0)').toMatchDomTextSnapShot();
    }

    /********************************************************************
     * get element content
    ********************************************************************/


    /********************************************************************
     * change element content
    ********************************************************************/
    enterExitFullScreen() {
        cy.get('button[title*="Full Screen"]').click({force: true});
    }

    zoomIn() {
        cy.get('button[title="Zoom In"]').click({force: true});
    }

    zoomOut() {
        cy.get('button[title="Zoom Out"]').click({force: true});
    }

    showHideLegend() {
        cy.get('button[title="Legend"]').click({force: true});
    }

    showHideDetails() {
        cy.get('button:has(span:contains("Details"))').click({force: true});
    }

    switchChartType(chartType) {
        cy.get('li[title^="' + chartType + '"]').click({force: true});
        cy.wait(1000);
    }

}
  
export default ActionBar;