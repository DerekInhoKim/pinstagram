import {SET_FOLLOWING} from '../actions/following'

const initialState = []

const followerReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_FOLLOWING:
            return action.following;
        default: {
            return state
        }
    }
}

export default followerReducer
