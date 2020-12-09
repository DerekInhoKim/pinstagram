import {SET_POSTUSER} from '../actions/postUser'

const initialState = {}

const postsReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_POSTUSER:
            return {...action.postUser};
        default: {
            return state
        }
    }
}

export default postsReducer
