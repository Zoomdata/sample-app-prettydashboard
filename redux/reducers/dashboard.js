//My reducers
import { ADD_WIDGET, CLOSE_WIDGET, RESIZE_WIDGET, SET_CHARTMAX, SET_CHARTUPD, FIRST_RENDER } from '../actions';
import { getItem } from '../../utils/tools';
const initialState = {
  initial: false,
  zoom: '',
  name:'',
  toupd: false,
  nextid: 7,
  widgets:[
      { i: '1', name: 'TREND CHART', type:'TREND',  
          x: 0, y: 5, h:10, w:6, minW:4, minH:7,  width: 600, height: 400 },
      { i: '2', name: 'LOANS BY GRADE', type:'DONUT', 
          x: 6, y: 0, h:10, w:6, minW:4, minH:7, width: 600, height:380 },
      { i: '3', name: 'PORTFOLIO', type:'KPIPORTFOLIO', 
          x: 0, y: 0, h:5, w:2, minW:2, minH:5,  width: 200, height:170 },
      { i: '4', name: 'O/S', type:'KPIOS', 
          x: 2, y: 0, h:5, w:2, minW:2, minH:5, width: 200, height:170 },
      { i: '5', name: 'DELINQ. RECENCY', type:'KPIDELINQUENCYRECENCY', 
          x: 4, y: 0, h:5, w:2, minW:2, minH:5, width: 200, height:170 },
      { i: '6', name: 'DEF PROPENSITY', type:'KPIDEFAULTPROPENSITY', 
          x: 6, y: 10, h:5, w:2, minW:2, minH:5, width: 200, height:170 },
  ]
}

const data = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHARTMAX: //Widget to be maximized
            if (!action.id) { return Object.assign({}, state, {zoom: '', name: ''}) }
            var res = getItem(state.widgets, action.id)
            return Object.assign({}, state, {zoom: res.type, name: res.name})

        case SET_CHARTUPD: //Widget to be updated, ie: resize
            return Object.assign({}, state, {toupd: action.id})

        case FIRST_RENDER:
            return Object.assign({}, state, {initial: true})

        case ADD_WIDGET:
            let newItem = Object.assign({}, action.data, {i:state.nextid+''})
            let obj = Object.assign({}, state, { widgets: [...state.widgets, newItem], nextid: state.nextid + 1 })
            return obj;

        case RESIZE_WIDGET:
            return Object.assign({}, state, {
                widgets: state.widgets.map((w) => {
                    return w.type === action.data.id ?
                        Object.assign({}, w, { 'width': action.data.width, 'height': action.data.height }) : w
                })
            });

        case CLOSE_WIDGET:
            return Object.assign({}, state, {
                widgets: state.widgets.filter((w) => { return w.i !== action.id })
            });

        default:
            return state
    }
};

export default data;
