import {SET_POST} from '../actions/posts'

const initialState = {}

const postsReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_POST:
            return {...action.post};
        default: {
            return state
        }
    }
}

export default postsReducer
