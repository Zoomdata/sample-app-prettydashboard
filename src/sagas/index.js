import { take, put, call, fork, select } from 'redux-saga/effects';
import * as actions from '../redux/actions';
//-----Ticket Sales-----
import * as trendData     from '../config/queries/TicketSales/trendData';
import * as tmapEventData from '../config/queries/TicketSales/tmapEventData';
import * as pivotData     from '../config/queries/TicketSales/pivotData';
import * as kpiTotalData       from '../config/queries/TicketSales/kpiTotalData';
import * as stateData       from '../config/queries/TicketSales/stateData';
import { createClient }   from '../config';

let queryData = [];
let stateQueryRunning, trendQueryRunning, pivotQueryRunning, tMapEventQueryRunning, kpiTotalQueryRunning

function fetchDataApi(thread, group) {
    var queryGroup = group;
    let prom = new Promise( function(resolve, reject) {
        thread.on('thread:message', function(data) {
            queryData = data;
            resolve(queryData);
        });
        thread.on('thread:notDirtyData', function() {
            if (queryGroup === 'state') {
                stateQueryRunning = false;
            } else if (queryGroup === 'trend') {
                trendQueryRunning = false;
            } else if (queryGroup === 'treeMapEvent') {
                tMapEventQueryRunning = false;
            } else if (queryGroup === 'pivot') {
                pivotQueryRunning = false;
            } else if (queryGroup === 'kpiTotal') {
                kpiTotalQueryRunning = false;
            } 
            resolve(queryData);
        });
        thread.on('thread:exeption', function(error) {
            reject(error);
        });
    })
    return prom
}

function getQuery(client, source, queryConfig) {
    return client.createQuery(
        {name: source},
        queryConfig
    )
}

function getThread(client, query) {
    return client.run(query);
}


var makeSingleFilter = function(path) {
    return function(value) {
        var result = [];
        if (value !== undefined && value !== 'All') {
            result.push( {
              path: path,
              operation: 'IN',
              value: [value],
              "form": null
            });
        }
        return result;
    };
}

var makeMultiSelectFilter = function(path) {
    return function(value) {
        var result = [];
        if (value !== undefined && value.length > 0) {
            result.push( {
              path: path,
              operation: 'IN',
              value: value,
              "form": null
            });
        }
        return result;
    };
}

var categoryFilter = makeMultiSelectFilter('catname');
var stateFilter = makeSingleFilter('state');
var cityFilter = makeSingleFilter('city');

function setFilters(getState, objDataQuery){
        let state = getState();
        let categories = [];
        state.chartFilters.categories.map(function(c) {
            if(c.checked){categories.push(c.val)}
        });
        let userstate = state.chartFilters.userstate;
        let usercity = state.chartFilters.usercity;
        var filters = categoryFilter(categories);
        if(userstate != 0){
            filters = filters.concat(stateFilter(userstate));
        }
        if(usercity != 0){
            filters = filters.concat(cityFilter(usercity));
        }
        objDataQuery.filters.remove('catname');
        objDataQuery.filters.remove('state');
        objDataQuery.filters.remove('city');
        objDataQuery.filters.add(filters);
}


function* changeKpiQuery(getState) {
    while(true) {
        yield take(actions.CHANGE_KPI_FILTER);
        setFilters(getState, KpiTotalDataQuery)
        yield fork(fetchKpiTotalData, KpiTotalDataThread);
    }
}
function* changeTrendQuery(getState) {
    while(true) {
        yield take(actions.CHANGE_TREND_FILTER);
        setFilters(getState, TrendDataQuery);
        yield fork(fetchTrendData, TrendDataThread);
    }
}

function* fetchTrendData(client, source, queryConfig) {
    trendQueryRunning = true;
    if (!TrendDataQuery) {
        const query = yield call(getQuery, client, source, queryConfig);
        TrendDataQuery = query;
    }
    yield put(actions.requestTrendData(trendData.source));
    if(!TrendDataThread){
        const thread = yield call(getThread, client, TrendDataQuery);
        TrendDataThread = thread;
    }
    while (trendQueryRunning) {
        const data = yield call(fetchDataApi, TrendDataThread, 'trend');
        if (trendQueryRunning) {
            yield put(actions.receiveTrendData(data));
        }
    }
}
function* changeTreeMapQuery(getState) {
    while(true) {
        yield take(actions.CHANGE_TREEMAP_FILTER);
        setFilters(getState, TMapEventDataQuery);
        yield fork(fetchTreeMapEvent, TMapEventDataThread);
    }
}

function* fetchTreeMapEvent(client, source, queryConfig) {
    tMapEventQueryRunning = true;
    if (!TMapEventDataQuery) {
        const query = yield call(getQuery, client, source, queryConfig);
        TMapEventDataQuery = query;
    }
    yield put(actions.requestTMapEventData(tmapEventData.source));
    if(!TMapEventDataThread){
        const thread = yield call(getThread, client, TMapEventDataQuery);
        TMapEventDataThread = thread;
    }
    while (tMapEventQueryRunning) {
        const data = yield call(fetchDataApi, TMapEventDataThread, 'treeMapEvent');
        if (tMapEventQueryRunning) {
            yield put(actions.receiveTMapEventData(data));
        }
    }
}

function* changePivotQuery(getState) {
    while(true) {
        yield take(actions.CHANGE_PIVOT_FILTER);
        setFilters(getState, PivotDataQuery);
        yield fork(fetchPivotData, PivotDataThread);
    }
}
function* fetchPivotData(client, source, queryConfig) {
    pivotQueryRunning = true;
    if (!PivotDataQuery) {
        const query = yield call(getQuery, client, source, queryConfig);
        PivotDataQuery = query;
    }
    yield put(actions.requestPivotData(pivotData.source));
    if (!PivotDataThread) {
        const thread = yield call(getThread, client, PivotDataQuery);
        PivotDataThread = thread;
    }
    while (pivotQueryRunning) {
        const data = yield call(fetchDataApi, PivotDataThread, 'pivot');
        if (pivotQueryRunning) {
            yield put(actions.receivePivotData(data));
        }
    }
}

function* fetchKpiTotalData(client, source, queryConfig) {
    kpiTotalQueryRunning = true;
    if (!KpiTotalDataQuery) {
        const query = yield call(getQuery, client, source, queryConfig);
        KpiTotalDataQuery = query;
    }
    yield put(actions.requestKpiTotalData(kpiTotalData.source));
    if (!KpiTotalDataThread) {
        const thread = yield call(getThread, client, KpiTotalDataQuery);
        KpiTotalDataThread = thread;
    }
    while (kpiTotalQueryRunning) {
        const data = yield call(fetchDataApi, KpiTotalDataThread, 'kpiTotal');
        if (kpiTotalQueryRunning) {
            yield put(actions.receiveKpiTotalData(data));
        }
    }
}

function* fetchStateData(client, source, queryConfig) {
    stateQueryRunning = true;
    if (!StateDataQuery) {
        const query = yield call(getQuery, client, source, queryConfig);
        StateDataQuery = query;
    }
    yield put(actions.requestStateData(stateData.source));
    if(!StateDataThread){
        const thread = yield call(getThread, client, StateDataQuery);
        StateDataThread = thread;
    }
    while (stateQueryRunning) {
        const data = yield call(fetchDataApi, StateDataThread, 'state');
        if (stateQueryRunning) {
            yield put(actions.receiveStateData(data));
        }
    }
}
function* startup(client) {
    yield fork(fetchStateData, client, stateData.source, stateData.queryConfig);
    yield fork(fetchTrendData, client, trendData.source, trendData.queryConfig);
    yield fork(fetchTreeMapEvent, client, tmapEventData.source, tmapEventData.queryConfig);
    yield fork(fetchPivotData, client, pivotData.source, pivotData.queryConfig);
    yield fork(fetchKpiTotalData, client, kpiTotalData.source, kpiTotalData.queryConfig);
}

export default function* root(getState) {
    const client = yield call(createClient);
    ZoomdataClient = client;
    yield call(client.sources.update, {name: 'Ticket Sales'});
    yield fork(startup, ZoomdataClient);
    //Filters change listeners
    yield fork(changeKpiQuery, getState);
    yield fork(changeTrendQuery, getState);
    yield fork(changeTreeMapQuery, getState);
    yield fork(changePivotQuery, getState);
}

export let ZoomdataClient = undefined;
export let StateDataQuery = undefined;
export let StateDataThread = undefined;
export let TrendDataQuery = undefined;
export let TrendDataThread = undefined;
export let TMapEventDataQuery = undefined;
export let TMapEventDataThread = undefined;
export let PivotDataQuery = undefined;
export let KpiTotalDataThread = undefined;
export let KpiTotalDataQuery = undefined;
export let PivotDataThread = undefined;
