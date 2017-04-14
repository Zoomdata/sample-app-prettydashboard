import { take, put, call, fork, select } from 'redux-saga/effects';
import * as actions from '../redux/actions';
//-----Ticket Sales queries-----
import * as trendData     from '../config/queries/trendData';
import * as tmapEventData from '../config/queries/tmapEventData';
import * as pivotData     from '../config/queries/pivotData';
import * as kpiTotalData  from '../config/queries/kpiTotalData';
import * as stateData     from '../config/queries/stateData';
import { createClient }   from '../config';

var currentLocation = '';
let queryData = [];
let stateQueryRunning, trendQueryRunning, pivotQueryRunning, tMapEventQueryRunning, kpiTotalQueryRunning

/**
 * fetchDataApi uses the Zoomdata SDK thread object to retrieve the query results.  The 
 * thread:notDirtyData event occurs when data is fully sharpen (e.g. results are complete).
 */
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
        { name: source }, 
        queryConfig
    )
}

function getThread(client, query) {
    return client.run(query);
}

/**
 * Parses the currentLocation variable wich contains the current URL of the browser in 
 * order to extract the GET parameters used to filter (by time) the data on the dashboard
 */
function parseURLParams() {
    if(currentLocation.indexOf('parentloc=') > -1){
        let url = currentLocation.split('parentloc=');
        var queryStart = url[1].indexOf("?") + 1,
            queryEnd   = url[1].indexOf("#") + 1 || url[1].length + 1,
            query = url[1].slice(queryStart, queryEnd - 1),
            pairs = query.replace(/\+/g, " ").split("&"),
            params = {}, i, n, v, nv;
        if (query === url[1] || query === "") { return; }
        for (i = 0; i < pairs.length; i++) {
            nv = pairs[i].split("=");
            n = decodeURIComponent(nv[0]);
            v = decodeURIComponent(nv[1]);
            if (!params.hasOwnProperty(n)) { params[n] = [] }
            params[n].push(nv.length === 2 ? v : null);
        }
        return params;
    }
    return false;
}

/**
 * Modify the query for each fetch function by adding the time parameter
 */
function modifyQuery(query){
    let params = parseURLParams();
    if(!params){ return query; }
    query.time = {}
    if(params.timeField){ query.time.timeField = params.timeField[0] }
    if(params.from){ query.time.from = params.from[0].replace(' ','+') }
    if(params.to){ query.time.to = params.to[0].replace(' ','+') }
    return query
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
var stateFilter = makeSingleFilter('venuestate');
var cityFilter = makeSingleFilter('venuecity');

/* Set the global filters (category, venuestate and venuecity) to each query */
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
        objDataQuery.filters.remove('venuestate');
        objDataQuery.filters.remove('venuecity');
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
    if(queryConfig){
        queryConfig = modifyQuery(queryConfig)
    }
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
    if(queryConfig){
        queryConfig = modifyQuery(queryConfig);
    }
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
    if(queryConfig){
        queryConfig = modifyQuery(queryConfig);
    }
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
    if(queryConfig){
        queryConfig = modifyQuery(queryConfig);
    }
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
    if(queryConfig){
        queryConfig = modifyQuery(queryConfig);
    }
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

/**
 * Invokes the startup() method to perform the initial data requests.  
 */
export default function* root(getState) {
    currentLocation = window.location.href;
    //Web storage is used whenever the app is called from an iframe tag
    //to keep GET values after oauth redirect
    if (typeof(Storage) !== "undefined") {
        if(localStorage.getItem('redirect') !== 'true'){
            console.log('Setting redirect info');
            localStorage.setItem('url', currentLocation);
            localStorage.setItem('redirect', 'true');
        }
        else{
            console.log('Getting redirect info');
            localStorage.removeItem("redirect");
            currentLocation = localStorage.getItem('url')
        }
    } else {
        // Sorry! No Web Storage support..
        console.error('Your browser does not support web storage');
    }
    console.log('Url location:',currentLocation);
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
