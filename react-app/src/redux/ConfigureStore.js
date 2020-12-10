import {createStore, combineReducers, compose } from 'redux'
import users from './reducers/users'
import comments from './reducers/comments'
import posts from './reducers/posts'
import postUser from './reducers/postUser'
import followers from './reducers/followers'
import following from './reducers/following'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Use the combine reducers to manage all of our slices of state
const reducer = combineReducers({
    users,
    comments,
    posts,
    postUser,
    followers,
    following
})


const configureStore = (initialState) => {
    return createStore(
        reducer,
        initialState,
        composeEnhancers()

    )
}

export default configureStore
