import AnalyticPage from './AnalyticPage'
import Card from '../analytics/Card'
import * as CardType from '../analytics/CardType'
import * as FilterLabel from '../common/FilterLabel'
import * as Global from '../common/Global'

class OverviewPage extends AnalyticPage {
    constructor() {
        super("/webx/index.html#webclient-anly&/Objects/ANLY/Dashboard")
    }
    /********************************************************************
     * check points
    ********************************************************************/
    checkCards() {
      cy.toMatchImageSnapshot();
    }
    
    checkCard(cardIndex, cardType) {
      let card = new Card(cardIndex);
      card.checkCardHeader();
      if (cardType == CardType.KPILINE) {
        card.checkKPILineCard();
      } else if (cardType == CardType.TABLE) {
        card.checkTableCard();
      }
    }

    checkOverall() {
      this.variant.checkCurrentVariant();
      this.filter.checkCurrentFilters();
      this.checkKPI(0);
    }

    checkKPI(cardIndex) {
      let card = new Card(cardIndex);
      card.checkKPILineCard();
    }

    /********************************************************************
     * get element content
    ********************************************************************/


    /********************************************************************
     * change element content
    ********************************************************************/
    naviageToMchart(cardIndex) {
      let card = new Card(cardIndex);
      card.clickHeader();
      cy.wait(Global.WAIT);
    }

    changeDataByFilter() {
      this.filter.selectDateFilter(FilterLabel.POSTING_DATE, ['01/01/2016...03/31/2016'], true);
    }
}

export default OverviewPage;