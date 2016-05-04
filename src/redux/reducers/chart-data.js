import * as actions from '../actions';

const initialState = {
    gradeData: {
        isFetching: false
    },
    kpiData: {
        isFetching: false
    },
    kpiTotals: {
        isFetching: false
    },
    trendData: {
        isFetching: false
    },
    pivotData: {
        isFetching: false        
    }
}

const data = (state = initialState, action) => {
    switch (action.type) {
        case actions.REQUEST_GRADE_DATA:

            var obj = Object.assign({}, state, { 
                gradeData: {
                    source: action.source,
                    isFetching: true
                }
            });

            return obj;
        case actions.RECEIVE_GRADE_DATA:

            var obj = Object.assign({}, state, {
                gradeData: {
                    source: state.gradeData.source,
                    isFetching: false,
                    data: action.data
                }
            });

            return obj;
        case actions.REQUEST_KPI_DATA:

            var obj = Object.assign({}, state, { 
                kpiData: {
                    source: action.source,
                    isFetching: true
                }
            });

            return obj;
        case actions.RECEIVE_KPI_DATA:
            var obj = Object.assign({}, state, {
                kpiData: {
                    source: state.kpiData.source,
                    isFetching: false,
                    data: action.data
                }
            });

            return obj;
        case actions.REQUEST_KPI_TOTALS:
            var obj = Object.assign({}, state, { 
                kpiTotals: {
                    source: action.source,
                    isFetching: true
                }
            });
            return obj;
        case actions.RECEIVE_KPI_TOTALS:
            var obj = Object.assign({}, state, {
                kpiTotals: {
                    source: state.kpiTotals.source,
                    isFetching: false,
                    data: action.data
                }
            });
            return obj;
        case actions.REQUEST_TREND_DATA:

            var obj = Object.assign({}, state, { 
                trendData: {
                    source: action.source,
                    isFetching: true
                }
            });

            return obj;
        case actions.RECEIVE_TREND_DATA:

            var obj = Object.assign({}, state, {
                trendData: {
                    source: state.trendData.source,
                    isFetching: false,
                    data: action.data
                }
            });

            return obj;
        case actions.REQUEST_PIVOT_DATA:

            var obj = Object.assign({}, state, { 
                pivotData: {
                    source: action.source,
                    isFetching: true
                }
            });

            return obj;
        case actions.RECEIVE_PIVOT_DATA:

            var obj = Object.assign({}, state, {
                pivotData: {
                    source: state.pivotData.source,
                    isFetching: false,
                    data: action.data
                }
            });

            return obj;
        default:
            return state
    }
};

export default data;
