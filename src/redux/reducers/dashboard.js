//My reducers
import { ADD_WIDGET, CLOSE_WIDGET, RESIZE_WIDGET, SET_CHART, FIRST_RENDER, SET_TABLE_FILTER } from '../actions';
const initialState = {
  initial: false,
  zoom: '',
  name:'',
  tableFilter:'All', //This will have to be moved to sagas
  widgets:[
      { id: 1, name: 'EVENTS', type:'TREEMAPEVENT', drow: 1, dcol: 1, dsizex: 3, dsizey: 2, width: 618, height: 408 },
      { id: 2, name: 'TICKET SOLDS & TRANSACTIONS', type:'TREND', drow: 3, dcol: 1, dsizex: 3, dsizey: 2, width: 618, height: 408 },
      { id: 3, name: 'TICKET SALES', type:'PIVOT', drow: 1, dcol: 4, dsizex: 3, dsizey: 2, width: 620, height:410 },
      { id: 4, name: 'KPI1', type:'KPI1', drow: 3, dcol: 4, dsizex: 1, dsizey: 1, width: 200, height:200, val:'54.2'},
      { id: 5, name: 'KPI2', type:'KPI2', drow: 3, dcol: 5, dsizex: 1, dsizey: 1, width: 200, height:200, val:'692'},
      { id: 6, name: 'KPI3', type:'KPI3', drow: 3, dcol: 6, dsizex: 1, dsizey: 1, width: 200, height:200, val:'1023'},
      //{ id: 7, name: 'KPI4', type:'KPI4', drow: 4, dcol: 4, dsizex: 1, dsizey: 1, width: 200, height:200, val:'444.2'}, 
      //{ id: 8, name: 'KPI5', type:'KPI5', drow: 4, dcol: 5, dsizex: 1, dsizey: 1, width: 200, height:200, val:'551.2'}, 
      //{ id: 9, name: 'KPI6', type:'KPI6', drow: 4, dcol: 6, dsizex: 1, dsizey: 1, width: 200, height:200, val:'892.1'}, 
  ]
}

function getPos(elems,id){
    elems.forEach(function (e){
        if (e.id == id) return elems.indexOf(e);
    })
}

function getType(elems,id){
    let type = '';
    let name = '';
    elems.forEach(function (e){
        if (e.id == id) {
            type = e.type;
            name = e.name;
        }
    })
    return [type,name];
}

const data = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHART:
            var res = getType(state.widgets, action.id)
            let obj = Object.assign({}, state, {zoom: res[0], name:res[1]})
            console.log(obj);
            return obj;

        case FIRST_RENDER:
            return Object.assign({}, state, {initial: true})

        case ADD_WIDGET:
            return Object.assign({}, state, { widgets: [...state.widgets, action.data] })

        case RESIZE_WIDGET:
            return Object.assign({}, state, {
                widgets: state.widgets.map((w) => {
                    return w.type === action.data.id ?
                        Object.assign({}, w, { 'width': action.data.width, 'height': action.data.height }) : w
                })
            });

        case CLOSE_WIDGET:
            return Object.assign({}, state, {
                widgets: state.widgets.filter((w) => { return w.id !== action.id })
            });

        case SET_TABLE_FILTER:
            return Object.assign({}, state, {tableFilter: action.filter})

        default:
            return state
    }
};

export default data;
