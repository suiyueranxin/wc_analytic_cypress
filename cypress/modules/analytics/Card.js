class Card {
    constructor(cardIndex) {
        this.cardIndex = cardIndex;
        this.rootPath = 'div.card:eq('+this.cardIndex+')';
    }
    
    /********************************************************************
     * check points
    ********************************************************************/
    checkCardHeader() {
        cy.get(this.rootPath + ' .card-header span.card-title').toMatchDomTextSnapShot();
        cy.get(this.rootPath + ' .card-header span.card-subtitle').toMatchDomTextSnapShot()
    }
    checkKPILineCard() {
        cy.get(this.rootPath + ' .kpiNumber .sapMNCValueScr').then($value => {
            cy.wrap($value).toMatchDomTextSnapShot();
            if ($value.text() != '0') {
                cy.get(this.rootPath + ' .kpiNumber .sapMNCScale').toMatchDomTextSnapShot();
            }
        });
    }
    
    checkLineCard() {

    }

    checkStackedColumnCard() {

    }

    checkTableCard() {
        cy.get(this.rootPath + ' .counter').toMatchDomTextSnapShot();
    }

    checkDonutCard() {

    }

    checkHeatmapCard() {

    }

    checkTotal() {
        cy.get(this.rootPath + ' span[id$="dataset_sum"]').toMatchDomTextSnapShot();
        cy.get(this.rootPath + ' div[id*="details"] span.sapMBtnContent').toMatchDomTextSnapShot();
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
    selectDataPoints(indexArr) {
        if (typeof indexArr == 'number') {
            indexArr = [indexArr];
        }
        indexArr.forEach(index => {
            cy.get(this.rootPath + ' g[data-id="' + index + '"]').first().click({force: true});
        })
    }

    showDetails() {
        cy.get(this.rootPath + ' div[id*=details] button').click({force: true});
    }

    hoverDataPoint(index) {
        cy.get(this.rootPath + ' g.v-datapoint:eq(' + index + ')').hover();
    }

    selectLegends(indexArr) {
        if (typeof indexArr == 'number') {
            indexArr = [indexArr];
        }
        indexArr.forEach(index => {
            cy.get(this.rootPath + ' div.card:eq(1) g.v-legend-item').click({force: true});
        })
    }

    clickHeader() {
        cy.get('div.card-header:eq('+ this.cardIndex + ')').click();
    }
}
  
export default Card;