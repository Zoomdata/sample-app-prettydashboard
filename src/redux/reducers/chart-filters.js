import { SET_CATEGORIES_FILTER } from '../actions';
const initialState = {
    categories:[ { checked: false,  val:'Musicals' },
                 { checked: false, val:'Plays'},
                 { checked: false, val:'Pop'},
                 { checked: false, val:'Opera'},
    ]
}

const data = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES_FILTER:
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
