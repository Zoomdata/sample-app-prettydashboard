//My reducers
import { ADD_WIDGET, CLOSE_WIDGET, RESIZE_WIDGET, SET_CHART } from '../actions';
const initialState = {
  zoom: '',
  widgets:[
      { id: 0, name: 'TREND CHART', type:'TREND', drow: 2, dcol: 1, dsizex: 3, dsizey: 2 },
      { id: 1, name: 'LOANS BY GRADE', type:'DONUT', drow: 1, dcol: 4, dsizex: 3, dsizey: 2 },
      { id: 2, name: 'PORTFOLIO', type:'KPI-PORTFOLIO', drow: 1, dcol: 1, dsizex: 1, dsizey: 1},
      { id: 3, name: 'O/S', type:'KPI-OS', drow: 1, dcol: 2, dsizex: 1, dsizey: 1},
      { id: 4, name: 'DELINQ. RECENCY', type:'KPI-DELINQUENCY-RECENCY', drow: 1, dcol: 3, dsizex: 1, dsizey: 1},
      { id: 5, name: 'DEF PROPENSITY', type:'KPI-DEFAULT-PROPENSITY', drow: 3, dcol: 4, dsizex: 1, dsizey: 1}
  ]
}

function getPos(elems,id){
    elems.forEach(function (e){
        if (e.id == id) return elems.indexOf(e);
    })
}

function getType(elems,id){
    if (id == '#') return '';
    elems.forEach(function (e){
        if (e.id == id) return e.type;
    })
}

const data = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHART:
            return Object.assign({}, state, {zoom: getType(state.widgets, action.id)
 })

        case ADD_WIDGET:
            return {widgets:[].concat(state.widgets,action.data)}

        case RESIZE_WIDGET:
            return Object.assign({}, state, {
                widgets: state.widgets.map((w) => {
                    return w.id === action.data.id ?
                        Object.assign({}, w, { 'width': action.data.width, 'heigth': action.data.heigth }) : w
                })
            });

        case CLOSE_WIDGET:
            return Object.assign({}, state, {
                widgets: state.widgets.filter((w) => {
                    return w.id !== action.id
                })
            });

        default:
            return state
    }
};

export default data;
