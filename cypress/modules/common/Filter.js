import { Log } from '../util/Log'

class Filter {
    constructor() {
    }
    
    /********************************************************************
     * check points
    ********************************************************************/
    checkCurrentFilters() {
        cy.get('label.sapUiCompFilterLabel bdi').each($label => {
            cy.wrap($label).toMatchDomTextSnapShot();
        })
        cy.get('span.sapMTokenText').each($text => {
            cy.wrap($text).toMatchDomTextSnapShot();
        })
    }
    
    checkCurrentFilter() {

    }
    
    /********************************************************************
     * get element content
    ********************************************************************/


    /********************************************************************
     * change element content
    ********************************************************************/
    clearFilter(name, clickGo) {
        cy.get('div.sapUiVlt:has(label[title="'+name+'"]) div[role="listitem"] span[role="presentation"]').each($deleteSpan => {
            cy.wrap($deleteSpan).click();
        });
        this.refreshData(clickGo);
    }

    clearAllFilter(clickGo) {
        cy.get('.sapFDynamicPageHeaderContent div[role="listitem"] span[role="presentation"]').each($deleteSpan => {
            cy.wrap($deleteSpan).click();
        });
        this.refreshData(clickGo);
    }

    selectFilterByCondition(name, values, clickGo) {
        cy.get('div.sapUiVlt:has(label[title="'+name+'"]) div.sapMInputBaseIconContainer').click();
        if (name != PostingDate)
        cy.get('div[role="tab"]:contains("DEFINE CONDITIONS")').click();
        values.forEach((row, index) => {
            let operator = row[0];
            let value = row[1];
            cy.get('div.sapMDialogOpen span.sapMSltArrow:last').click();
            cy.get('li.sapMSelectListItem[role="option"]:contains("' + operator +'")').click();
            cy.get('div.sapMDialogOpen input.sapMInputBaseInner:last').clear({force: true}).type(value, {force: true});
            if (index != values.length-1) {
                cy.get('button[title="Add"]').click();
            }
        })
        cy.get('div[role="toolbar"] button:contains("OK")').click({force: true});
        this.refreshData(clickGo);
    }

    @Log('Change filter of date type')
    selectDateFilter(name, values, clickGo) {
        cy.get('div.sapUiVlt:has(label[title="'+name+'"]) div.sapMInputBaseIconContainer').click();
        // cy.get('div.sapMDialogOpen div.sapMInputValHelp').click();
        values.forEach((value, index) => {
            cy.get('div.sapMDialogOpen input.sapMInputBaseInner:last').clear({force: true}).type(value, {force: true});
            if (index != values.length-1) {
                cy.get('button[title="Add"]').click();
            }
        })
        cy.get('div[role="toolbar"] button:contains("OK")').click({force: true});
        this.refreshData(clickGo);   
    }

    selectFilterFromList(name, values, clickGo) {
        cy.get('div.sapUiVlt:has(label[title="'+name+'"]) div.sapMInputBaseIconContainer').click();
        cy.wait(1000);
        values.forEach(value => {
            cy.get('tr.sapUiTableTr:has(div.sapUiTableCell span:contains("'+ value +'"))').then($row => {
                cy.get('div[role="rowheader"]:eq(' + $row.attr('data-sap-ui-rowindex') + ')').click({force: true});
            })
        })
        cy.get('div[role="toolbar"] button:contains("OK")').click({force: true});
        this.refreshData(clickGo);
    }

    selectEnumFilter(name, values, clickGo) {
        cy.get('div.sapUiVlt:has(label[title="'+name+'"]) div.sapMInputBaseIconContainer').click();
        values.forEach(value => {
            cy.get('li:has(.sapMLIBContent:contains("' + value + '")) div[role="checkbox"]').then($checkbox => {
                if ($checkbox.attr('aria-checked') != 'true') {
                    cy.wrap($checkbox).click({force: true});
                }
            })
        })
        this.refreshData(clickGo);
    }

    setFilter(name, values, clickGo) {
        values.forEach(value => {
            cy.get('div.sapUiVlt:has(label[title="'+name+'"]) div.sapMInput').type(value+'{enter}');
        });
        this.refreshData(clickGo);
    }

    addFilter(name, values, clickGo) {

    }

    showFilter(clickGo) {

    }

    hideFilter(clickGo) {

    }

    clickGo() {
        cy.focused().blur();
        cy.wait(1000); // wait filter render completed
        cy.get('.sapFDynamicPageHeaderContent button[id$="btnGo"]').click({force: true});
    }

    refreshData(clickGo) {
        if (clickGo) {
            this.clickGo()
        }
    }
  }
  
  export default Filter;