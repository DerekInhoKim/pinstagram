// This route will make a GET request to get the number of likes for a post
export const getPostLikes = async (postId) => {
    const response = await fetch(`/api/likes/${postId}`)
    return await response.json()

}

// This route makes a POST request to like a new post
export const likePost = async (postId, userId) => {
    const response = await fetch('/api/likes/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            postId,
            userId
        })
    })
    if (!response.ok){
        console.log('something went wrong')
        return await response.json()
    }
    return await response.json()
}

export const dislikePost = async (postId, userId) => {
    const response= await fetch('/api/likes/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            postId,
            userId
        })
    })
    return await response.json()
}

// This route makes a request to see if a user likes a post
export const userLikesPost = async (postId, userId) => {
    const response = await fetch(`/api/likes/${userId}/post/${postId}`)
    return await response.json()

}
