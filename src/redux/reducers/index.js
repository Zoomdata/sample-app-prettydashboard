import { combineReducers } from 'redux';
import chartData from './chart-data';
import dashboard from './dashboard';
import chartFilters from './chart-filters';
import {responsiveStateReducer} from 'redux-responsive';

const rootReducer = combineReducers({
    browser: responsiveStateReducer,
    dashboard,
    chartData,
    chartFilters
});

export default rootReducer;
