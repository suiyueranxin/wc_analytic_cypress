/// <reference types="Cypress" />

import OverviewPage from "../../../modules/pages/OverviewPage"
import * as FilterLabel from "../../../modules/common/FilterLabel"
import MChartPage from "../../../modules/pages/MChartPage";
import * as ChartType from "../../../modules/analytics/ChartType";
import Card from "../../../modules/analytics/Card";
import * as CardType from "../../../modules/analytics/CardType";
import HomePage from "../../../modules/pages/HomePage"

describe('Sales Analysis Overview', () => {
    before(() => {
    });

    beforeEach(() => {
        cy.fixture('user').then(user => {
            cy.login(user.super)
        });
    });

    afterEach(() => {
        let overview = new OverviewPage();
        overview.variant.removeAll();
    });
  
    it('Open page at first time', () => {
        cy.total(9);

        cy.step(1, 'open overview page')
        let overview = new OverviewPage();
        overview.visit();
        
        cy.step(2, 'check variant')
        overview.variant.checkCurrentVariant();
        
        cy.step(3, 'check filter settings')
        overview.filter.checkCurrentFilters();

        cy.step(4, 'check kpi line card display')
        overview.checkCard(0, CardType.KPILINE);

        cy.step(5, 'check line card display')
        overview.checkCard(1, CardType.LINE);
        
        cy.step(6, 'check stacked column card display')
        overview.checkCard(2, CardType.STACKED_COLUMN);

        cy.step(7, 'check table card display')
        overview.checkCard(3, CardType.TABLE);

        cy.step(8, 'check donut card display')
        overview.checkCard(4, CardType.DONUT);

        cy.step(9, 'check heatmap card display')
        overview.checkCard(5, CardType.HEATMAP);          
    });

    it('Change filters of different data types and operators', () => {
        cy.total(5);

        cy.step(1, 'open overview page')
        let overview = new OverviewPage();
        overview.visit();

        cy.step(2, 'set date type filter: Posting Date')
        overview.filter.selectDateFilter(FilterLabel.POSTING_DATE, ['01/01/2016...03/31/2016'], true);
        overview.checkKPI(0);

        cy.step(3, 'set enum type filter: Document Type Display Name')
        overview.filter.selectEnumFilter(FilterLabel.DOCUMENT_TYPE_DISPLAY_NAME, ['A/R Invoice', 'Sales Order'], true);
        overview.checkKPI(0);

        cy.step(4, 'set string type filter (Code): Business Partner Code')
        overview.filter.selectFilterFromList(FilterLabel.BUSINESS_PARTNER_CODE, ['C25000','C60000'], true);
        overview.checkKPI(0);

        cy.step(5, 'set string type filter (Name): Business Parnter Group Name')
        overview.filter.selectFilterFromList(FilterLabel.BUSINESS_PARTNER_GROUP_NAME, ['Customers', 'High Tech'], true);
        overview.checkKPI(0);

        //operator: Equal To

        //operator: Contains

        //operator: Starts with

        //operator: Ends with
    });

    it.skip('Show details', () => {
        cy.total(7);

        cy.step(1, 'open overview page')
        let overview = new OverviewPage();
        overview.visit();

        cy.step(2, 'Change one filter to make cards have data')
        overview.changeDataByFilter();

        [0, 1, 2, 4, 5].forEach((cardIndex, index) => {
            let card = new Card(cardIndex);
            cy.step(index+3+'-1', 'select a datapoint and check sum total')
            //TODO: Details will be from enable to disabled after click a data point
            card.selectDataPoints(0);
            card.checkTotal();

            cy.step(index+3+'-2', 'open details and check details content')
            card.showDetails();
            card.checkDetails();

            if (index == 1) { // no total
                cy.step(index+3+'-3', 'for dual line chart, select another datapoint and check no sum total')
                card.selectDataPoints(3);
                card.checkTotal();

                cy.step(index+3+'-4', 'for dual line chart, open details and check details content')
                card.showDetails();
                card.checkDetails();
            }
        })
    });

    it('Navigate to chart', () => {
        let overview = new OverviewPage();
        overview.visit();
        overview.changeDataByFilter();
        
        let charts = [
            ChartType.LINE,
            ChartType.LINE,
            ChartType.STACKED_COLUMN,
            ChartType.TABLE,
            ChartType.DONUT,
            ChartType.HEATMAP
        ]
        charts.forEach((chartType, index) => {
            overview.naviageToMchart(index);
            let mchart = new MChartPage(chartType);
            mchart.chart.checkChartType(chartType);
            mchart.bindingSelector.checkAllBindings(chartType);
            mchart.back();
        })
        
    });

    it('Save as, update, remove and switch variant', () => {
        let overview = new OverviewPage();
        overview.visit();

        overview.filter.selectDateFilter(FilterLabel.POSTING_DATE, ['01/01/2016...03/31/2016'], true);
        overview.variant.saveAs('AT variant 1');

        overview.revisit();
        
        overview.variant.switchTo('AT variant 1');
        overview.variant.checkCurrentVariant();
        overview.filter.checkCurrentFilters();
        overview.checkKPI(0);

        overview.filter.selectEnumFilter(FilterLabel.DOCUMENT_TYPE_DISPLAY_NAME, ['A/R Invoice', 'Sales Order'], true);
        overview.variant.save();

        overview.variant.switchTo('Standard');
        overview.variant.checkCurrentVariant();

        overview.variant.switchTo('AT variant 1')
        overview.variant.checkCurrentVariant();
        overview.checkKPI(0);   
    });

    it('Set default variant', () => {
        cy.total(9);

        cy.step(1, 'open overview page')
        let overview = new OverviewPage();
        overview.visit();

        cy.step(2, 'change filter and save as variant 1 with default variant')
        overview.filter.selectDateFilter(FilterLabel.POSTING_DATE, ['01/01/2016...03/31/2016'], true);
        overview.variant.saveAs('variant 1', true, true);

        cy.step(3, 'change filter and save as variant 2')
        overview.filter.selectEnumFilter(FilterLabel.DOCUMENT_TYPE_DISPLAY_NAME, ['A/R Invoice', 'Sales Order'], true);
        overview.variant.saveAs('variant 2');

        cy.step(4, 'check default variant is "variant 1"')
        overview.revisit();
        overview.variant.checkCurrentVariant();

        cy.step(5, 'set variant 2 as default variant and check')
        overview.variant.setAsDefault('variant 2');
        overview.revisit();
        overview.variant.checkCurrentVariant();

        cy.step(6, 'set standard as default variant and check')
        overview.variant.setAsDefault('Standard');
        overview.revisit();
        overview.variant.checkCurrentVariant();
 
        cy.step(7, 'set variant 1 as default variant and switch to variant 2')
        overview.variant.setAsDefault('variant 1');
        overview.variant.switchTo('variant 2')

        cy.step(8, 'remove current variant and check current variant switch to variant 1')
        overview.variant.remove('variant 2');
        overview.variant.checkCurrentVariant();

        cy.step(9, 'remove current default variant and check variant switch to standard')
        overview.variant.remove('variant 1');
        overview.variant.checkCurrentVariant();
    });

    it.skip('Pin variant', () => {
        cy.total(9);

        cy.step(1, 'open overview page')
        let overview = new OverviewPage();
        overview.visit();

        cy.step(2, 'save variant 1 and pin to home page')
        let home = new HomePage();
        overview.filter.selectDateFilter(FilterLabel.POSTING_DATE, ['01/01/2016...03/31/2016'], true);
        overview.variant.saveAs('variant 1');
        overview.variant.pinTo('tile 1');
        overview.navigateToHome(); 
        
        cy.step(3, 'open pinned variant and check status')
        home.openTile('tile 1');
        overview.checkOverall();

        cy.step(4, 'update pinned variant in page')
        overview.filter.selectEnumFilter(FilterLabel.DOCUMENT_TYPE_DISPLAY_NAME, ['A/R Invoice', 'Sales Order'], true);
        overview.variant.save();

        //TODO: BUG: SBO100-7749
        cy.step(5, 'reopen pinned variant and check status after update')
        overview.navigateToHome();
        home.openTile('tile 1');
        overview.checkOverall();

        //TODO: BUG: SBO100-7744
        cy.step(5, 'remove this variant in page and check status after reopen')
        overview.variant.remove('variant 1');
        overview.navigateToHome();
        home.openTile('tile 1');
        overview.checkOverall();

        cy.step(6, 'clear tile in home page')
        home.removeTile('tile 1');
    });

})
  