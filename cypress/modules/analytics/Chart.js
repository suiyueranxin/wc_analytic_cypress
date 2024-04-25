import { TABLE } from "./ChartType";

class Chart {
    constructor() {
        this.rootPath = '.sapSuiteUiCommonsChartContainerChartArea';
    }
    
    /********************************************************************
     * check points
    ********************************************************************/
    checkChartType(chartType) {
        if (chartType == TABLE) {
            cy.get('.sapUiTable').should('not.be.empty')
        } else {
            cy.get('g.v-m-desc-title title:eq(0)').toMatchDomTextSnapShot();
        }  
    }

    checkChartDisplay() {
        // cy.get('div[id$="chartContainer-chartArea"]').then($con => {
        //     if ($con.find('g.v-m-plot').length > 0 || $con.find('div.sapUiTable').length > 0) {
        //         cy.wrap($con).toMatchImageSnapshot();
        //     } 
        // })
        // cy.get('div[id$="chartContainer-chartArea"] g.v-m-plot').toMatchImageSnapshot(); 
        // cy.document().toMatchImageSnapshot();
        cy.get('div[id$="chartContainer-chartArea"] g.v-m-plot').first().screenshot()
    }
    
    checkWarningMessage(show) {
        cy.get('.sapSuiteUiCommonsChartContainerChartArea').within($chart => {
            if (show) {
                cy.get('.ui5-viz-controls-viz-description[aria-label="Select at least one value in the field"]').should('exist');
            } else {
                cy.get('.ui5-viz-controls-viz-description[aria-label="Select at least one value in the field"]').should('not.exist');
            }
        })
    }

    checkLegend(show) {
        if (show) {
            cy.get(this.rootPath + ' .v-m-legend rect:last').should('not.have.attr', 'width', '0')
        } else {
            cy.get(this.rootPath + ' .v-m-legend rect:last').should('have.attr', 'width', '0')
        }
    }

    /********************************************************************
     * get element content
    ********************************************************************/


    /********************************************************************
     * change element content
    ********************************************************************/
    selectDataPoints(indexArr) {
        if (typeof indexArr == 'number') {
            indexArr = [indexArr];
        }
        indexArr.forEach(index => {
            cy.get(this.rootPath + ' g[data-id="' + index + '"]').first().click({force: true});
        })
    }

    hoverDataPoint(index) {

    }

    selectLegends(indexArr) {

    }
}
  
export default Chart;