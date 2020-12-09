export const SET_POST = 'SET_POST'

export const setPostStore = (post) => {
    return {
        type: SET_POST,
        post
    }
}
