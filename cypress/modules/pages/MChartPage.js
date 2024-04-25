import AnalyticPage from './AnalyticPage'
import ActionBar from '../analytics/ActionBar';
import BindingSelector from '../analytics/BindingSelector';
import Chart from '../analytics/Chart';
import { Log } from '../util/Log';

class MChartPage extends AnalyticPage {
    constructor(viewId) {
        super("/webx/index.html#webclient-ANLY&/Objects/ANLY/ChartContainer?view="+viewId)
        this.actionBar = new ActionBar();
        this.bindingSelector = new BindingSelector();
        this.chart = new Chart();
    }

    /********************************************************************
     * check points
    ********************************************************************/
    @Log()
    checkChartTypeSwitch(switchFlow) {
        switchFlow.forEach(chartType => {
            this.actionBar.switchChartType(chartType);
            this.bindingSelector.checkAllBindings(chartType);
        });
    }

    @Log()
    checkOverAll() {
        this.variant.checkCurrentVariant();
        this.filter.checkCurrentFilters();
        this.chart.checkChartType();
        this.bindingSelector.checkAllBindings();    
    }

    @Log()
    checkWarning(chartType, show) {
        this.bindingSelector.checkWarningBox(chartType, show);
        this.chart.checkWarningMessage(show)
    }

    @Log('Image snapshot of chart')
    checkChartDisplay() {
        this.chart.checkChartDisplay();
    }

    /********************************************************************
     * get element content
     ********************************************************************/


    /********************************************************************
     * change element content
     ********************************************************************/

}

export default MChartPage;