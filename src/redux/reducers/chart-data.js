import * as actions from '../actions';

/**
 * Specifies how the application state changes in response of "data" actions.  These data
 * actions are triggered from the Sagas implementation (request and receive data events).
 */
const initialState = {
    stateData:      { isFetching: false },
    trendData:      { isFetching: false },
    tmapEventData:  { isFetching: false },
    pivotData:      { isFetching: false },
    kpiTotalData:   { isFetching: false },
    kpiData:        { isFetching: false },
}

const data = (state = initialState, action) => {
    switch (action.type) {

        //=========== State Data ================
        case actions.REQUEST_STATE_DATA:
            var data = state.stateData.data;
            return Object.assign({}, state, { 
                stateData: {
                    source: action.source,
                    isFetching: true,
                    data: data
                }
            });

        case actions.RECEIVE_STATE_DATA:
            return Object.assign({}, state, {
                stateData: {
                    source: state.stateData.source,
                    isFetching: false,
                    data: action.data
                }
            });

        //=========== Trend Data ================
        case actions.REQUEST_TREND_DATA:
            var data = state.trendData.data;
            return Object.assign({}, state, { 
                trendData: {
                    source: action.source,
                    isFetching: true,
                    data: data
                }
            });

        case actions.RECEIVE_TREND_DATA:
            return Object.assign({}, state, {
                trendData: {
                    source: state.trendData.source,
                    isFetching: false,
                    data: action.data
                }
            });

        //=========== Tree Map Event Data ============
        case actions.REQUEST_TMAP_EVENT_DATA:
            var data = state.tmapEventData.data;
            return Object.assign({}, state, { 
                tmapEventData: {
                    source: action.source,
                    isFetching: true,
                    data: data
                }
            });

        case actions.RECEIVE_TMAP_EVENT_DATA:
            return Object.assign({}, state, { 
                tmapEventData: {
                    source: state.tmapEventData.source,
                    isFetching: false,
                    data: action.data
                }
            });

        //=========== Pivot Data============
        case actions.REQUEST_PIVOT_DATA:
            var data = state.pivotData.data;
            return Object.assign({}, state, { 
                pivotData: {
                    source: action.source,
                    isFetching: true,
                    data: data
                }
            });
        case actions.RECEIVE_PIVOT_DATA:
            return Object.assign({}, state, {
                pivotData: {
                    source: state.pivotData.source,
                    isFetching: false,
                    data: action.data
                }
            });

        //=========== Kpi TOtal Data============
        case actions.REQUEST_KPI_TOTAL_DATA:
            var data = state.kpiTotalData.data;
            return Object.assign({}, state, { 
                kpiTotalData: {
                    source: action.source,
                    isFetching: true,
                    data: data,
                }
            });
        //=========== Kpi TOtal Data============
        case actions.RECEIVE_KPI_TOTAL_DATA:
            return Object.assign({}, state, {
                kpiTotalData: {
                    source: state.kpiTotalData.source,
                    isFetching: false,
                    data: action.data
                }
            });

        default:
            return state
    }
};

export default data;
