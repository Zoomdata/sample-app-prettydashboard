import * as actions from '../actions';

const initialState = {
    trendData: {
        isFetching: false
    },
    tmapEventData: {
        isFetching: false
    },
    pivotData: {
        isFetching: false
    },
}

const data = (state = initialState, action) => {
    switch (action.type) {
        //=========== Trend Data ================
        case actions.REQUEST_TREND_DATA:
            return Object.assign({}, state, { 
                trendData: {
                    source: action.source,
                    isFetching: true
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
            return Object.assign({}, state, { 
                tmapEventData: {
                    source: action.source,
                    isFetching: true
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
            return Object.assign({}, state, { 
                pivotData: {
                    source: action.source,
                    isFetching: true
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

        default:
            return state
    }
};

export default data;
