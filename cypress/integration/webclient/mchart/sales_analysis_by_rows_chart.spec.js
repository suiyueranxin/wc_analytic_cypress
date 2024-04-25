/// <reference types="Cypress" />
import MChartPage from "../../../modules/pages/MChartPage";
import * as ViewId from "../../../modules/analytics/ViewId";
import * as ChartType from "../../../modules/analytics/ChartType";
import * as FilterLabel from "../../../modules/common/FilterLabel";
import * as Field from "../../../modules/common/Field";

describe('Sales Analysis by Rows Chart', () => {
    before(() => {
    });

    beforeEach(() => {
        cy.fixture('user').then(user => {
            cy.login(user.super)
        }); 
    });

    afterEach(() => {
        let mchart = new MChartPage(ViewId.SALES_BY_ROWS_CHART);
        mchart.variant.removeAll();
    });
  
    it('Open chart page at first time', () => {
        cy.total(2);

        cy.step(1, 'open mchart page')    
        let mchart = new MChartPage(ViewId.SALES_BY_ROWS_CHART);
        mchart.visit();

        cy.step(2, 'check variant, filter, chart type, chart bindings')
        mchart.checkOverAll();
    });

    it('Change filters of different data types and operators', () => {
        cy.total(5);

        cy.step(1, 'open mchart page')
        let mchart = new MChartPage(ViewId.SALES_BY_ROWS_CHART);
        mchart.visit();

        cy.step(2, 'set date type filter: Posting Date')
        mchart.filter.selectDateFilter(FilterLabel.POSTING_DATE, ['01/01/2016...03/31/2016'], true);
        mchart.checkChartDisplay();

        cy.step(3, 'set enum type filter: Document Type Display Name')
        mchart.filter.selectEnumFilter(FilterLabel.DOCUMENT_TYPE_DISPLAY_NAME, ['A/R Invoice', 'Sales Order'], true);
        mchart.checkChartDisplay();

        cy.step(4, 'set string type filter (Code): Business Partner Code')
        mchart.filter.selectFilterFromList(FilterLabel.BUSINESS_PARTNER_CODE, ['C25000','C60000'], true);
        mchart.checkChartDisplay();

        cy.step(5, 'set string type filter (Name): Business Parnter Group Name')
        mchart.filter.selectFilterFromList(FilterLabel.BUSINESS_PARTNER_GROUP_NAME, ['Customers', 'High Tech'], true);
        mchart.checkChartDisplay();

        //operator: Equal To

        //operator: Contains

        //operator: Starts with

        //operator: Ends with
    });

    it('Switch chart type status-1: xy/table measure:2, dim1:1, dim2:1', () => {
        cy.total(4);

        cy.step(1, 'open mchart page')
        let mchart = new MChartPage(ViewId.SALES_BY_ROWS_CHART);
        mchart.visit();

        cy.step(2, 'change data to make chart have data')
        mchart.filter.selectDateFilter(FilterLabel.POSTING_DATE, ['01/01/2016...03/31/2016'], true);

        cy.step(3, 'xy->pie->heatmap->xy Net Sales Amount (LC), Gross Profit (LC), Posting Year and Month, All')
        mchart.actionBar.switchChartType(ChartType.STACKED_BAR);
        mchart.checkChartTypeSwitch([ChartType.PIE, ChartType.HEATMAP, ChartType.COLUMN]);

        cy.step(4, 'xy->heatmap->pie->xy Net Sales Amount (LC), Gross Profit (LC), Posting Year and Quarter, All')
        mchart.actionBar.switchChartType(ChartType.BAR);
        mchart.bindingSelector.selectDimension1(Field.POSTING_YEAR_AND_QUARTER);
        mchart.checkChartTypeSwitch([ChartType.HEATMAP, ChartType.PIE, ChartType.LINE]);

        //TODO: BUG table->pie->heatmap will missing second dimension
        cy.step(5, 'table->pie->heatmap->xy Net Sales Amount (LC), Gross Profit (LC), Posting Year and Month, All')
        mchart.actionBar.switchChartType(ChartType.TABLE);
        mchart.bindingSelector.selectDimension1(Field.POSTING_YEAR_AND_MONTH);
        mchart.checkChartTypeSwitch([ChartType.PIE, ChartType.HEATMAP, ChartType.COLUMN]);

        //TODO: BUG: SBO100-11263 table->heatmap->pie will lose one measure
        cy.step(6, 'table->heatmap->pie->xy Net Sales Amount (LC), Gross Profit (LC), Posting Year and Week, All')
        mchart.actionBar.switchChartType(ChartType.TABLE);
        mchart.bindingSelector.selectDimension1(Field.POSTING_YEAR_AND_WEEK);
        mchart.checkChartTypeSwitch([ChartType.HEATMAP, ChartType.PIE, ChartType.TABLE]);
    })

    it('Switch chart type status-2: xy/table, measure:1, dim1:1, dim2:1', () => {
        cy.total(4);

        cy.step(1, 'open mchart page')
        let mchart = new MChartPage(ViewId.SALES_BY_ROWS_CHART);
        mchart.visit();

        cy.step(2, 'change data to make chart have data')
        mchart.filter.selectDateFilter(FilterLabel.POSTING_DATE, ['01/01/2016...03/31/2016'], true);

        cy.step(3, 'xy->pie->heatmap->xy Gross Profit (LC), Posting Year and Month, All')
        mchart.actionBar.switchChartType(ChartType.BAR);
        mchart.bindingSelector.removeMeasures(1);
        mchart.checkChartTypeSwitch([ChartType.PIE, ChartType.HEATMAP, ChartType.COLUMN]);

        cy.step(4, 'xy->heatmap->pie->xy Gross Profit (LC), Posting Year and Quarter, All')
        mchart.actionBar.switchChartType(ChartType.TABLE);
        mchart.bindingSelector.selectDimension1(Field.POSTING_YEAR_AND_QUARTER);
        mchart.checkChartTypeSwitch([ChartType.HEATMAP, ChartType.PIE, ChartType.TABLE]);
    })

    it('Switch chart type status-3: xy/table, measure:1, dim1:1, dim2:1 (not All)', () => {
        cy.total(4);

        cy.step(1, 'open mchart page')
        let mchart = new MChartPage(ViewId.SALES_BY_ROWS_CHART);
        mchart.visit();

        cy.step(2, 'change data to make chart have data')
        mchart.filter.selectDateFilter(FilterLabel.POSTING_DATE, ['01/01/2016...03/31/2016'], true);

        cy.step(3, '3-1: xy->pie->heatmap->xy Net Sales Amount (LC), Posting Year and Month, Item Group')
        mchart.actionBar.switchChartType(ChartType.STACKED_COLUMN);
        mchart.bindingSelector.selectDimension2(Field.ITEM_GRPOUP);
        mchart.checkChartTypeSwitch([ChartType.PIE, ChartType.HEATMAP, ChartType.COLUMN]);

        cy.step(4, '3-2: xy->heatmap->pie->xy Net Sales Amount (LC), Posting Year, Item Group')
        mchart.actionBar.switchChartType(ChartType.TABLE);
        mchart.bindingSelector.selectDimension1(Field.POSTING_YEAR_AND_WEEK)
        mchart.checkChartTypeSwitch([ChartType.HEATMAP, ChartType.PIE, ChartType.TABLE]);
    })

    it('Switch chart type status-4: pie, measure:2, dim1:1(All)', () => {
        cy.total(4);

        cy.step(1, 'open mchart page')
        let mchart = new MChartPage(ViewId.SALES_BY_ROWS_CHART);
        mchart.visit();

        cy.step(2, 'change data to make chart have data')
        mchart.filter.selectDateFilter(FilterLabel.POSTING_DATE, ['01/01/2016...03/31/2016'], true);

        cy.step(3, 'pie->xy->heatmap->pie Net Sales Amount (LC), Gross Profit (LC), Net Sales Amount (SC), All')
        mchart.actionBar.switchChartType(ChartType.DONUT);
        mchart.bindingSelector.addMeasures(1);
        mchart.checkChartTypeSwitch([ChartType.TABLE, ChartType.HEATMAP,  ChartType.PIE]);

        //TODO: BUG: pie->heatmap->table will lost one measure  SBO100-8276
        cy.step(4, 'pie->heatmap->xy->pie Gross Profit (LC), Net Sales Amount (SC),  All')
        mchart.actionBar.switchChartType(ChartType.PIE);
        mchart.bindingSelector.removeMeasures(1);
        mchart.checkChartTypeSwitch([ChartType.HEATMAP, ChartType.TABLE, ChartType.DONUT]);
    })

    it('Switch chart type status-5: pie, measure:1, dim1:1(All)', () => {
        cy.total(4);

        cy.step(1, 'open mchart page')
        let mchart = new MChartPage(ViewId.SALES_BY_ROWS_CHART);
        mchart.visit();

        cy.step(2, 'change data to make chart have data')
        mchart.filter.selectDateFilter(FilterLabel.POSTING_DATE, ['01/01/2016...03/31/2016'], true);

        cy.step(3, 'pie->xy->heatmap->pie Net Sales Amount (LC), All')
        mchart.actionBar.switchChartType(ChartType.PIE);
        mchart.bindingSelector.removeMeasures(1);
        mchart.checkChartTypeSwitch([ChartType.LINE, ChartType.HEATMAP, ChartType.PIE]);

        cy.step(4, 'pie->heatmap->xy->pie Net Sales Amount (LC), All')
        mchart.actionBar.switchChartType(ChartType.DONUT);
        mchart.bindingSelector.deleteAllMeasures();
        mchart.bindingSelector.addMeasures(1);
        mchart.checkChartTypeSwitch([ChartType.HEATMAP, ChartType.BAR, ChartType.DONUT]);
    })

    it('Switch chart type status-6: pie, measure:1, dim1:1(not All)', () => {
        cy.total(4);

        cy.step(1, 'open mchart page')
        let mchart = new MChartPage(ViewId.SALES_BY_ROWS_CHART);
        mchart.visit();

        cy.step(2, 'change data to make chart have data')
        mchart.filter.selectDateFilter(FilterLabel.POSTING_DATE, ['01/01/2016...03/31/2016'], true);

        cy.step(3, 'pie->xy->heatmap->pie Net Sales Amount (LC), Posting Year and Week')
        mchart.actionBar.switchChartType(ChartType.PIE);
        mchart.bindingSelector.selectDimension1(Field.ITEM_GRPOUP);
        mchart.checkChartTypeSwitch([ChartType.COLUMN, ChartType.HEATMAP, ChartType.PIE]);

        cy.step(4, 'pie->heatmap->xy->pie Net Sales Amount (LC), Posting Year and Month')
        mchart.actionBar.switchChartType(ChartType.DONUT);
        mchart.bindingSelector.selectDimension1(Field.BUSINESS_PARTNER_GROUP_NAME);
        mchart.checkChartTypeSwitch([ChartType.COLUMN, ChartType.HEATMAP, ChartType.PIE]);
    })

    it('Switch chart type status-7: heatmap, measure:1, dim1:1, dim2:1 (All)', () => {
        cy.total(4);

        cy.step(1, 'open mchart page')
        let mchart = new MChartPage(ViewId.SALES_BY_ROWS_CHART);
        mchart.visit();

        cy.step(2, 'change data to make chart have data')
        mchart.filter.selectDateFilter(FilterLabel.POSTING_DATE, ['01/01/2016...03/31/2016'], true);

        cy.step(3, 'heatmap->xy->pie->heatmap Net Sales Amount (LC), Business Partner Group Name, All')
        mchart.actionBar.switchChartType(ChartType.HEATMAP);
        mchart.bindingSelector.selectDimension1(Field.BUSINESS_PARTNER_GROUP_NAME);
        mchart.checkChartTypeSwitch([ChartType.COLUMN, ChartType.PIE, ChartType.HEATMAP]);

        cy.step(4, 'heatmap->pie->xy->heatmap Net Sales Amount (LC), Item Group, All')
        mchart.bindingSelector.selectDimension1(Field.ITEM_GRPOUP);
        mchart.checkChartTypeSwitch([ChartType.PIE, ChartType.TABLE, ChartType.HEATMAP]);
    })

    it('Switch chart type status-8: heatmap, measure:1, dim1:1, dim2:1 (not All)', () => {
        cy.total(4);

        cy.step(1, 'open mchart page')
        let mchart = new MChartPage(ViewId.SALES_BY_ROWS_CHART);
        mchart.visit();

        cy.step(2, 'change data to make chart have data')
        mchart.filter.selectDateFilter(FilterLabel.POSTING_DATE, ['01/01/2016...03/31/2016'], true);

        cy.step(3, 'heatmap->xy->pie->heatmap Net Sales Amount (LC), Posting Year and Month, Business Partner Group Name')
        mchart.bindingSelector.selectDimension2(Field.BUSINESS_PARTNER_GROUP_NAME);

        mchart.checkChartTypeSwitch([ChartType.LINE, ChartType.DONUT, ChartType.HEATMAP]);
        cy.step(4, 'heatmap->pie->xy->heatmap Net Sales Amount (LC), Posting Year and Month, Item Group')
        mchart.bindingSelector.selectDimension2(Field.ITEM_GRPOUP);
        mchart.checkChartTypeSwitch([ChartType.PIE, ChartType.COLUMN, ChartType.HEATMAP]);
    })

    it('Multiple and single selection', () => {
        cy.total(7);

        cy.step(1, 'open mchart page')
        let mchart = new MChartPage(ViewId.SALES_BY_ROWS_CHART);
        mchart.visit();

        cy.step(2, 'change data to make chart have data')
        mchart.filter.selectDateFilter(FilterLabel.POSTING_DATE, ['01/01/2016...03/31/2016'], true);

        cy.step('3', 'xy, measure:2, dim1:1, dim2:1 (All)')
        cy.step('3-1', 'check measures will remove to one if select one item in dimension 2')
        mchart.bindingSelector.selectDimension2(Field.ITEM_GRPOUP)
        mchart.bindingSelector.checkMeasures();
        cy.step('3-2', 'check dimension 2 will select All if add one more item in measure')
        mchart.bindingSelector.addMeasures(1);
        mchart.bindingSelector.checkDimension2();

        cy.step('4', 'switch to table chart') 
        mchart.actionBar.switchChartType(ChartType.TABLE);

        cy.step('5', 'table, measure:2, dim1:1 (All)') 
        cy.step('5-1', 'check measures will remove to one if select one item in dimension 1')
        mchart.bindingSelector.selectDimension2(Field.BUSINESS_PARTNER_GROUP_NAME)
        mchart.bindingSelector.checkMeasures();
        cy.step('5-2', 'check dimension 1 will select All if add one more item in measure')
        mchart.bindingSelector.addMeasures(1);
        mchart.bindingSelector.checkDimension2();

        cy.step('6', 'switch to pie chart') 
        mchart.actionBar.switchChartType(ChartType.PIE);

        cy.step('7', 'pie, measure:2, dim1:1 (All)') 
        cy.step('7-1', 'check measures will remove to one if select one item in dimension 1')
        mchart.bindingSelector.selectDimension1(Field.ITEM_GRPOUP)
        mchart.bindingSelector.checkMeasures();
        cy.step('7-2', 'check dimension 1 will select All if add one more item in measure')
        mchart.bindingSelector.addMeasures(1);
        mchart.bindingSelector.checkDimension2();
    });

    it('Red warning box', () => {
        cy.total(9);

        cy.step(1, 'open mchart page')
        let mchart = new MChartPage(ViewId.SALES_BY_ROWS_CHART);
        mchart.visit();

        cy.step(2, 'remove all measure to check red warning box')
        mchart.bindingSelector.unselectAllMeasures();
        mchart.checkWarning(ChartType.LINE, true);

        cy.step(3, 'check can change dimension selector when warning box show')
        mchart.bindingSelector.selectDimension1(Field.POSTING_YEAR_AND_QUARTER);
        mchart.bindingSelector.selectDimension2(Field.ITEM_GRPOUP);

        cy.step(4, 'add one more item in measure then warning box hide')
        mchart.bindingSelector.addMeasures(1);
        mchart.checkWarning(ChartType.LINE, false);

        cy.step(5, 'remove all measure')
        mchart.bindingSelector.unselectAllMeasures();

        cy.step(6, 'switch to xy chart to check red warning box still show')
        mchart.actionBar.switchChartType(ChartType.STACKED_BAR);
        mchart.checkWarning(ChartType.STACKED_BAR, true);

        cy.step(7, 'switch to pie chart to check red warning box still show')
        mchart.actionBar.switchChartType(ChartType.PIE);
        mchart.checkWarning(ChartType.PIE, true);

        cy.step(8, 'switch to table chart to check red warning box not show')
        mchart.actionBar.switchChartType(ChartType.TABLE);
        mchart.checkWarning(ChartType.TABLE, false);

        cy.step(9, 'switch to xy chart, save variant, switch to this variant then check red warning box still show')
        mchart.actionBar.switchChartType(ChartType.COLUMN);
        mchart.variant.saveAs('variant 1');
        mchart.variant.switchTo('Standard');
        mchart.variant.switchTo('variant 1');
        mchart.checkWarning(ChartType.COLUMN, true);
    });

    it('Chart interaction, show/hide legend, zoom in/out, fullscreen', () => {
        cy.total(5);

        cy.step(1, 'open mchart page')
        let mchart = new MChartPage(ViewId.SALES_BY_ROWS_CHART);
        mchart.visit();

        cy.step(2, 'change data to make chart have data')
        mchart.filter.selectDateFilter(FilterLabel.POSTING_DATE, ['01/01/2016...03/31/2016'], true);
        mchart.checkChartDisplay();

        cy.step(3, 'show/hide legend')
        mchart.actionBar.showHideLegend();
        mchart.chart.checkLegend(false);
        mchart.actionBar.showHideLegend();
        mchart.chart.checkLegend(true);

        cy.step(4, 'zoom in/out')
        mchart.bindingSelector.selectDimension1(Field.POSTING_YEAR_AND_WEEK);
        mchart.actionBar.zoomIn();
        mchart.checkChartDisplay();
        mchart.actionBar.zoomOut();
        mchart.checkChartDisplay();

        cy.step(5, 'fullscreen')
        mchart.actionBar.enterExitFullScreen();
        mchart.checkChartDisplay();
        mchart.actionBar.enterExitFullScreen();
        mchart.checkChartDisplay();
    });

    it('Show details', () => {
        cy.total(10);

        cy.step(1, 'open mchart page')
        let mchart = new MChartPage(ViewId.SALES_BY_ROWS_CHART);
        mchart.visit();

        cy.step(2, 'change data to make chart have data')
        mchart.filter.selectDateFilter(FilterLabel.POSTING_DATE, ['01/01/2016...03/31/2016'], true);

        cy.step(3, 'select a datapoint, check total show')
        mchart.chart.selectDataPoints(0);
        mchart.actionBar.checkTotal();
        mchart.actionBar.showHideDetails();
        mchart.actionBar.checkDetails();

        cy.step(4, 'select one more datapoint, check total hide')
        mchart.chart.selectDataPoints(3);
        mchart.actionBar.checkTotal();
        mchart.actionBar.showHideDetails();
        mchart.actionBar.checkDetails();

        cy.step(5, 'switch chart type, hide total and details')
        mchart.actionBar.switchChartType(ChartType.PIE)
        mchart.actionBar.checkTotal();
        
        cy.step(6, 'switch to table, details not show')
        mchart.chart.selectDataPoints(0);
        mchart.actionBar.switchChartType(ChartType.TABLE)
        mchart.actionBar.checkTotal(ChartType.TABLE);

        cy.step(7, 'change binding, hide total and details')
        mchart.actionBar.switchChartType(ChartType.LINE)
        mchart.chart.selectDataPoints(0);
        mchart.bindingSelector.selectDimension1(Field.POSTING_YEAR_AND_WEEK)
        mchart.actionBar.checkTotal();

        cy.step(8, 'show/hide legend, hide total and details')
        mchart.chart.selectDataPoints(0);
        mchart.actionBar.showHideLegend();
        mchart.actionBar.checkTotal();

        cy.step(9, 'zoom in/out, not hide total and details')
        mchart.chart.selectDataPoints(0);
        mchart.actionBar.zoomIn();
        mchart.actionBar.checkTotal();
        mchart.actionBar.zoomOut();
        mchart.actionBar.checkTotal();

        //TODO: BUG: SBO100-11576
        cy.step(10, 'fullscreen, not hide total and details')
        mchart.actionBar.enterExitFullScreen();
        mchart.actionBar.checkTotal();
        mchart.actionBar.enterExitFullScreen();
        mchart.actionBar.checkTotal();
    })

    it.skip('Save as, update and switch variant', () => {
          
    });

    it.skip('Set default variant', () => {
       
    });

    it.skip('Pin variant', () => {
        
    });  
})