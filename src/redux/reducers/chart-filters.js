import { CHANGE_PIVOT_FILTER } from '../actions';
const initialState = {
    categories:[  { checked: true,  val:'Musicals' },
                   { checked: true, val:'Plays'},
                   { checked: true, val:'Pop'},
                   { checked: true, val:'Opera'},
    ]
}

const data = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PIVOT_FILTER:
            return Object.assign({}, state, {categories: state.categories.map((c) =>{
                return c.val === action.cat ?
                    Object.assign({}, c, { 'checked': !c.checked }) : c
                })}
               )
        default:
            return state
    }
};

export default data;
