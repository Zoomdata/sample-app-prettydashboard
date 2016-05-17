//My reducers
import { ADD_WIDGET, CLOSE_WIDGET, RESIZE_WIDGET, SET_CHART, FIRST_RENDER, SET_TABLE_FILTER } from '../actions';
const initialState = {
  initial: false,
  zoom: '',
  name:'',
  tableFilter:'All', //This will have to be moved to sagas
  widgets:[
     { id: 0, 
          name: '', 
          type:'MENU', 
          drow: 1, dcol: 1, dsizex: 18, dsizey: 1, 
          width: 1250, height:60, 
          data:{
              querydata: false,
              options: {delete:false, zoom:false, config: false},
              optconfig: {}
          } 
      },   
      { id: 1, 
          name: 'CITIES - VENUES', 
          type:'TREEMAPEVENT', 
          drow: 2, dcol: 1, 
          dsizex: 9, dsizey: 6, 
          width: 620, height: 410, 
          data:{
              querydata: 'tmapEventData',
              options: {delete:true, zoom:true, config: true},
              optconfig: {}
          }
      },
      { id: 2, 
          name: 'TICKET SOLDS & TRANSACTIONS', 
          type:'TREND', 
          drow: 5, dcol: 10, 
          dsizex: 9, dsizey: 6, 
          width: 620, height: 410,
          data:{
              querydata: 'trendData',
              options: {delete:true, zoom:true, config: false},
              optconfig: {}
          } 
      },   
      { id: 3, 
          name: 'TICKET SALES', 
          type:'PIVOT', 
          drow: 8, dcol: 1, 
          dsizex: 9, dsizey: 6, 
          width: 620, height: 410 ,
          data:{
              querydata: 'pivotData',
              options: {delete:true, zoom:true, config: false},
              optconfig: {}
          } 
      },   
      { id: 4, 
          name: 'LIKES JAZZ', 
          type:'KPI-JAZZ', 
          drow: 2, dcol: 10, 
          dsizex: 3, dsizey: 3, 
          width: 200, height: 200, 
          data:{
              querydata: 'kpiTotalData',
              options: {delete:true, zoom:false, config: false},
              optconfig: {}
          } 
      },   
      { id: 5, 
          name: 'LIKES ROCK', 
          type:'KPI-ROCK', 
          drow: 2, dcol: 13, 
          dsizex: 3, dsizey: 3, 
          width: 200, height: 200, 
          data:{
              querydata: 'kpiTotalData',
              options: {delete:true, zoom:false, config: false},
              optconfig: {}
          } 
      },   
     { id: 6, 
          name: 'LIKES SPORTS', 
          type:'KPI-SPORTS', 
          drow: 2, dcol: 16, 
          dsizex: 3, dsizey: 3, 
          width: 200, height: 200, 
          data:{
              querydata: 'kpiTotalData',
              options: {delete:true, zoom:false, config: false},
              optconfig: {}
          } 
      },   

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
