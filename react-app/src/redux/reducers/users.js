import {SET_USER, REMOVE_USER} from '../actions/users'

const initialState = {}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER:
            return {...state, user: action.user};
        case REMOVE_USER:
            return {}
        default: {
            return state
        }
    }
}

export default userReducer
