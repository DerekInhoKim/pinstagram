import {ADD_COMMENT, REMOVE_COMMENT, UPDATE_COMMENT} from '../actions/comments'

const initialState = []

const commentsReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_COMMENT:
            return [...state, action.comment];
        case REMOVE_COMMENT:
            return []
        default: {
            return state
        }
    }
}

export default commentsReducer
