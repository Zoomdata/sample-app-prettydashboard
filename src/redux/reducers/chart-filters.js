import { SET_CATEGORIES_FILTER, SET_TREEMAP_FILTER } from '../actions';
const initialState = {
    categories:[ { checked: false,  val:'Musicals' },
                 { checked: false, val:'Plays'},
                 { checked: false, val:'Pop'},
                 { checked: false, val:'Opera'},
    ],
    mapmetric: { type:'sum', value:'pricepaid',name:'Sales'}, 
}

const data = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES_FILTER:
            return Object.assign({}, state, {categories: state.categories.map((c) =>{
                return c.val === action.cat ?
                    Object.assign({}, c, { 'checked': !c.checked }) : c
                })}
               )
        case SET_TREEMAP_FILTER:
            return Object.assign({}, state, {mapmetric: action.metric})

        default:
            return state
    }
};

export default data;
