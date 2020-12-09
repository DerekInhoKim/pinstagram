import {SET_USER, REMOVE_USER} from '../actions/users'

const initialState = {}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER:
            // refactor to spread action.user
            return {...state, user: action.user};
        case REMOVE_USER:
            return {}
        default: {
            return state
        }
    }
}

export default userReducer
