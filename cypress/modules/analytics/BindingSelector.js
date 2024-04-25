import * as ChartType from "../analytics/ChartType"

class BindingSelector {
    constructor() {
    }
    
    /********************************************************************
     * check points
    ********************************************************************/
    checkAllBindings(chartType) {
        if (chartType == ChartType.HEATMAP) {
            this.checkMeasure();
        } else {
            this.checkMeasures();
        }
        this.checkDimension1();
        if (chartType != ChartType.PIE && chartType !=ChartType.DONUT) {
            this.checkDimension2();
        } 
    }

    checkMeasures() {
        cy.get('.sapSuiteUiCommonsChartContainerToolBarArea div[role="listitem"] span.sapMTokenText').each($label => {
            cy.wrap($label).toMatchDomTextSnapShot();
        });
    }

    checkMeasure() {
        cy.get('div.sapSuiteUiCommonsChartContainerToolBarArea label.sapMSltLabel:first').toMatchDomTextSnapShot();
    }

    checkDimension1() {
        cy.get('div.sapSuiteUiCommonsChartContainerToolBarArea label.sapMSltLabel').then($labels => {
            if ($labels.length == 3) {
                cy.wrap($labels[1]).toMatchDomTextSnapShot()
            } else {
                cy.wrap($labels[0]).toMatchDomTextSnapShot()
            }
        });
    }

    checkDimension2() {
        cy.get('div.sapSuiteUiCommonsChartContainerToolBarArea label.sapMSltLabel:last').toMatchDomTextSnapShot();
    }

    checkWarningBox(chartType, show) {
        let warningBoxCss = (chartType != ChartType.HEATMAP) ? '.sapMInputBaseContentWrapperError' : '.sapMSltError';
        cy.get('.sapSuiteUiCommonsChartContainerToolBarArea').within($toolbar => {
            if (show) {
                cy.get(warningBoxCss).should('exist');
            } else {
                cy.get(warningBoxCss).should('not.exist');
            }
        })
    }
    
    /********************************************************************
     * get element content
    ********************************************************************/


    /********************************************************************
     * change element content
    ********************************************************************/
    expandList(index) {
        cy.get('.sapSuiteUiCommonsChartContainerToolBarArea div[role="combobox"] span[id$="arrow"]:eq(' + index  + ')').click({force: true})
        cy.wait(1000);
    }

    closeList(index) {
        cy.get('.sapSuiteUiCommonsChartContainerToolBarArea div[role="combobox"] span[id$="arrow"]:eq(' + index  + ')').click({force: true});
        cy.wait(2000);
    }

    deleteMeasures(measuresArr) {
        measuresArr.forEach(measure => {
            cy.get('div[title="' + measure + '"] > span[role="presentation"]').click({force: true});
        });
    }

    deleteAllMeasures() {
        cy.get('.sapSuiteUiCommonsChartContainerToolBarArea div[role="listitem"] span[role="presentation"]')
            .each($delete => {
                cy.wrap($delete).click({force: true});
            })
    }

    unselectAllMeasures() {
        this.expandList(0);
        cy.get('.sapMComboBoxBasePicker[style*="visibility: visible"] div[role="checkbox"][aria-checked="true"]').each($checkbox => {
            cy.wrap($checkbox).click({force: true})
        });
        this.closeList(0);
    }

    unselectMeasures(measuresArr) {
        this.expandList(0);
        measuresArr.forEach(measure => {
            cy.get('.sapMComboBoxBasePicker[style*="visibility: visible"] li:has(.sapMLIBContent:contains("' + measure + ')) div[role="checkbox"][aria-checked="true"]').click({force: true})
        });
        this.closeList(0);
    }

    selectMeasures(measuresArr) {
        this.expandList(0);
        measuresArr.forEach(measure => {
            cy.get('.sapMComboBoxBasePicker[style*="visibility: visible"] li:has(.sapMLIBContent:contains("' + measure + ')) div[role="checkbox"]').click({force: true})
        });
        this.closeList(0);
    }

    // only this function for single selection for measure
    selectMeasure(measureStr) {
        this.expandList(0);
        cy.get('li.sapMSelectListItem[role="option"]:contains("' + measureStr +'")').last().click({force: true})
        cy.wait(1000)
    }

    selectDimension1(dim1Str) {
        this.expandList(1);
        cy.get('li.sapMSelectListItem[role="option"]:contains("' + dim1Str +'")').last().click({force: true})
        cy.wait(1000)
    }

    selectDimension2(dim2Str) {
        this.expandList(2);
        cy.get('li.sapMSelectListItem[role="option"]:contains("' + dim2Str +'")').last().click({force: true})
        cy.wait(1000)
    }

    selectAllBindings(measureStr, dim1Str, dim2Str) {
        this.selectMeasure(measureStr);
        this.selectDimension1(dim1Str);
        if (dim2Str) {
            this.selectDimension2(dim2Str);
        }
    }
    
    selectAllBindingsWithMutliMeasures(measureArr, dim1Str, dim2Str) {
        this.selectMeasures(measureArr);
        this.selectDimension2(dim1Str);
        if (dim2Str) {
            this.selectDimension2(dim2Str);
        }
    }

    addMeasures(count) {
        this.expandList(0);
        cy.get('.sapMComboBoxBasePicker[style*="visibility: visible"] li[aria-selected="false"] div[role="checkbox"]').then($items => {
            let i = 0;
            while ( i < count && count <= $items.length) {
                cy.wrap($items.get(i)).click({force: true});
                i++;
            }
        });
        this.closeList(0);
    }
    removeMeasures(count) {
        this.expandList(0);
        cy.get('.sapMComboBoxBasePicker[style*="visibility: visible"] li[aria-selected="true"] div[role="checkbox"]').then($items => {
            let i = 0;
            while ( i < count && count <= $items.length) {
                cy.wrap($items.get(i)).click({force: true});
                i++;
            }
        });
        this.closeList(0);
    }

    changeMeasure() {
        this.expandList(0);
        cy.get('.sapMPopover[style*="visibility: visible"] li[aria-selected="false"]:eq(0)').click({force: true});
        cy.wait(1000);
    }

    changeDimension(index) {
        this.expandList(index);
        cy.get('.sapMPopover[style*="visibility: visible"] li[aria-selected="false"][aria-disabled!="true"]:not(:contains("All")):eq(2)').click({force: true});
        cy.wait(1000);
    }

    changeDimensionToAll(index) {
        BindingSelector.prototype['selectDimension' + index].call(this, 'All');
        cy.wait(1000);
    }
}
  
export default BindingSelector;