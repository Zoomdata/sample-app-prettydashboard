import { take, put, call, fork, select } from 'redux-saga/effects';
import * as actions from '../redux/actions';
//-----Lend Club-----
//import * as gradeData from '../config/queries/LendClub/gradeData';
//import * as kpiData   from '../config/queries/LendClub/kpiData';
//import * as kpiTotals from '../config/queries/LendClub/kpiTotals';
//import * as pivotData from '../config/queries/LendClub/pivotData';
//import * as trendData from '../config/queries/LendClub/trendData';
//-----Ticket Sales-----
import * as trendData from '../config/queries/TicketSales/trendData';
import * as tmapEventData from '../config/queries/TicketSales/tmapEventData';
import * as pivotData from '../config/queries/TicketSales/pivotData';
import { createClient } from '../config';

let queryData = [];
let trendQueryRunning, pivotQueryRunning, tMapEventQueryRunning;

function fetchDataApi(thread, group) {
    var queryGroup = group;
    let prom = new Promise( function(resolve, reject) {
        thread.on('thread:message', function(data) {
            queryData = data;
            resolve(queryData);
        });
        thread.on('thread:notDirtyData', function() {
            if (queryGroup === 'trend') {
                trendQueryRunning = false;
            } else if (queryGroup === 'treeMapEvent') {
                tMapEventQueryRunning = false;
            } else if (queryGroup === 'pivot') {
                pivotQueryRunning = false;
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

function* fetchTrendData(client, source, queryConfig) {
    trendQueryRunning = true;

    const query = yield call(getQuery, client, source, queryConfig);
    TrendDataQuery = query;

    yield put(actions.requestTrendData(trendData.source));

    const thread = yield call(getThread, client, TrendDataQuery);
    TrendDataThread = thread;

    while (trendQueryRunning) {
        const data = yield call(fetchDataApi, TrendDataThread, 'trend');
        if (trendQueryRunning) {
            yield put(actions.receiveTrendData(data));
        }
    }
}

function* fetchTreeMapEvent(client, source, queryConfig) {
    tMapEventQueryRunning = true;

    const query = yield call(getQuery, client, source, queryConfig);
    TMapEventDataQuery = query;

    yield put(actions.requestTMapEventData(tmapEventData.source));

    const thread = yield call(getThread, client, TMapEventDataQuery);
    TMapEventDataThread = thread;

    while (tMapEventQueryRunning) {
        const data = yield call(fetchDataApi, TMapEventDataThread, 'treeMapEvent');
        if (tMapEventQueryRunning) {
            yield put(actions.receiveTMapEventData(data));
        }
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


function* startup(client) {
    yield fork(fetchTrendData, client, trendData.source, trendData.queryConfig);
    yield fork(fetchTreeMapEvent, client, tmapEventData.source, tmapEventData.queryConfig);
    yield fork(fetchPivotData, client, pivotData.source, pivotData.queryConfig);
}

export default function* root(getState) {
    const client = yield call(createClient);
    ZoomdataClient = client;
    yield call(client.sources.update, {name: 'Ticket Sales'});
    yield fork(startup, ZoomdataClient);
    //yield fork(changeTrendQuery, getState);
}

export let ZoomdataClient = undefined;
export let TrendDataQuery = undefined;
export let TrendDataThread = undefined;
export let TMapEventDataQuery = undefined;
export let TMapEventDataThread = undefined;
export let PivotDataQuery = undefined;
export let PivotDataThread = undefined;
