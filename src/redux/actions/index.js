//Query actions
export const REQUEST_TREND_DATA = 'REQUEST_TREND_DATA';
export const RECEIVE_TREND_DATA = 'RECEIVE_TREND_DATA';
export const REQUEST_TMAP_EVENT_DATA = 'REQUEST_TMAP_EVENT_DATA';
export const RECEIVE_TMAP_EVENT_DATA = 'RECEIVE_TMAP_EVENT_DATA';
export const REQUEST_PIVOT_DATA = 'REQUEST_PIVOT_DATA';
export const RECEIVE_PIVOT_DATA = 'RECEIVE_PIVOT_DATA';
//Filters
export const CHANGE_PIVOT_FILTER = 'SET_PIVOT_FILTER';
//App behaviour actions
export const ADD_WIDGET = 'ADD_WIDGET';
export const CLOSE_WIDGET = 'CLOSE_WIDGET';
export const RESIZE_WIDGET = 'RESIZE_WIDGET';
export const SET_CHART = 'SET_CHART';
export const SET_TABLE_FILTER = 'SET_TABLE_FILTER';

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
export function setTableFilter(filter){
    return {
        type: SET_TABLE_FILTER,
        filter
    }
}

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








/*TODO: remove these*/
export function requestGradeData(source) {
    return {
        type: REQUEST_GRADE_DATA,
        source
    }
}

export function receiveGradeData(data) {
    return {
        type: RECEIVE_GRADE_DATA,
        data
    }
}

export function requestKPIData(source) {
    return {
        type: REQUEST_KPI_DATA,
        source
    }
}

export function receiveKPIData(data) {
    return {
        type: RECEIVE_KPI_DATA,
        data
    }
}

export function requestKPITotals(source) {
    return {
        type: REQUEST_KPI_TOTALS,
        source
    }
}

export function receiveKPITotals(data) {
    return {
        type: RECEIVE_KPI_TOTALS,
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

export const FilterStatuses = {
    FILTERS_APPLIED: 'FILTERS_APPLIED',
    FILTERS_RESET: 'FILTERS_RESET'
}

export function setLoanGrade(param) {
	return {
		type: SET_LOAN_GRADE,
		param
	}
}

export function setTrendLoanGrade(param) {
	return {
		type: SET_TREND_LOAN_GRADE,
		param
	}
}

export function setTrendLoanStatus(param) {
    return {
        type: SET_TREND_LOAN_STATUS,
        param
    }
}

export function setTrendEmpLength(param) {
    return {
        type: SET_TREND_EMP_LENGTH,
        param
    }
}

export function changeTrendFilter() {
    return {
        type: CHANGE_TREND_FILTER
    }
}

export function changeCategoriesFilter(cat) {
    return {
        type: CHANGE_PIVOT_FILTER,
        cat
    }
}
