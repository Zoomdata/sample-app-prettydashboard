import { SET_LOAN_GRADE, SET_TREND_LOAN_GRADE, 
         SET_TREND_LOAN_STATUS, SET_TREND_EMP_LENGTH, 
         FilterStatuses } from '../actions';
const { FILTERS_RESET } = FilterStatuses;

const chartFilters = (state = {filterStatus: FILTERS_RESET}, action) => {
    switch (action.type) {
        case SET_LOAN_GRADE:
            var grade = {loanGrade: action.param};
            var obj = Object.assign({}, state, grade);
            return obj;
        case SET_TREND_LOAN_GRADE:
            var trendGrade = {trendLoanGrade: action.param};
            var obj = Object.assign({}, state, trendGrade);
            return obj;
        case SET_TREND_LOAN_STATUS:
            var trendLoanStatus = {trendLoanStatus: action.param};
            var obj = Object.assign({}, state, trendLoanStatus);
            return obj;
        case SET_TREND_EMP_LENGTH:
            var mergedEmpLength = mergeEmpLength(state.trendEmpLength, action.param);
            var trendEmpLength = {trendEmpLength: mergedEmpLength};
            var obj = Object.assign({}, state, trendEmpLength);
            return obj;
        default:
            return state;
    }
}

const mergeEmpLength = (currArray, param)  => {
    var currSelection = !currArray ? [] : currArray;
    var newSelection = currSelection.slice();

    var index = newSelection.indexOf(param.targetId);
    if (param.selected) {
        if (index === -1) {
            newSelection.push(param.targetId);
        }
    } else {
        if (index > -1) {
            newSelection.splice(index, 1);
        }
    }
    return newSelection;
}

export default chartFilters;