import BasePage from './BasePage'
import Filter from '../common/Filter';
import Variant from '../common/Variant';

class AnalyticPage extends BasePage {
    constructor(url) {
        super(url)
        this.filter = new Filter();
        this.variant = new Variant();
    }
    
}

export default AnalyticPage;