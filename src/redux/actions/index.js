//Query actions
export const REQUEST_TREND_DATA = 'REQUEST_TREND_DATA';
export const RECEIVE_TREND_DATA = 'RECEIVE_TREND_DATA';
export const REQUEST_TMAP_EVENT_DATA = 'REQUEST_TMAP_EVENT_DATA';
export const RECEIVE_TMAP_EVENT_DATA = 'RECEIVE_TMAP_EVENT_DATA';
export const REQUEST_PIVOT_DATA = 'REQUEST_PIVOT_DATA';
export const RECEIVE_PIVOT_DATA = 'RECEIVE_PIVOT_DATA';
export const REQUEST_KPI_TOTAL_DATA = 'REQUEST_KPI_TOTAL_DATA';
export const RECEIVE_KPI_TOTAL_DATA = 'RECEIVE_KPI_TOTAL_DATA';
//Filters
export const SET_CATEGORIES_FILTER = 'SET_CATEGORIES_FILTER';
export const CHANGE_PIVOT_FILTER = 'CHANGE_PIVOT_FILTER';
export const CHANGE_KPI_FILTER = 'CHANGE_KPI_FILTER';
export const CHANGE_TREND_FILTER = 'CHANGE_TREND_FILTER';
export const CHANGE_TREEMAP_FILTER = 'CHANGE_TREEMAP_FILTER';
export const SET_TABLE_FILTER = 'SET_TABLE_FILTER';
//App behaviour actions
export const ADD_WIDGET = 'ADD_WIDGET';
export const CLOSE_WIDGET = 'CLOSE_WIDGET';
export const RESIZE_WIDGET = 'RESIZE_WIDGET';
export const SET_CHART = 'SET_CHART';

export function addWidget(data){
  return{
    type: ADD_WIDGET,
    data
  }
}
export function setChart(id){
  return{
    type: SET_CHART,
    id
  }
}
export function resizeWidget(data){
  return{
    type: RESIZE_WIDGET,
    data
  }
}
export function closeWidget(id){
  return{
    type: CLOSE_WIDGET,
    id
  }
}

/*========= INITIAL REQUEST ACTIONS ==========*/
export function requestTrendData(source) {
	return {
        type: REQUEST_TREND_DATA,
        source
    }
}
export function receiveTrendData(data) {
    return {
        type: RECEIVE_TREND_DATA,
        data
    }
}

export function requestTMapEventData(source) {
	return {
        type: REQUEST_TMAP_EVENT_DATA,
        source
    }
}

export function receiveTMapEventData(data) {
    return {
        type: RECEIVE_TMAP_EVENT_DATA,
        data
    }
}
export function requestPivotData(source) {
    return {
        type: REQUEST_PIVOT_DATA,
        source
    }
}
export function receivePivotData(data) {
    return {
        type: RECEIVE_PIVOT_DATA,
        data
    }
}
export function requestKpiTotalData(source) {
    return {
        type: REQUEST_KPI_TOTAL_DATA,
        source
    }
}
export function receiveKpiTotalData(data) {
    return {
        type: RECEIVE_KPI_TOTAL_DATA,
        data
    }
}
/*===== FILTER ACTIONS ========*/
export function setCategoriesFilter(cat) {
    return {
        type: SET_CATEGORIES_FILTER,
        cat
    }
}
export function changeKpiFilter() {
    return {
        type: CHANGE_KPI_FILTER
    }
}
export function changeTrendFilter() {
    return {
        type: CHANGE_TREND_FILTER
    }
}
export function changeTreeMapFilter() {
    return {
        type: CHANGE_TREEMAP_FILTER
    }
}
export function changePivotFilter() {
    return {
        type: CHANGE_PIVOT_FILTER,
    }
}
