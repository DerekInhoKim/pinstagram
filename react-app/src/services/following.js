export const getFollowingPosts = async (userId) => {
    const response = await fetch(`/api/follows/${userId}/posts`)
    return await response.json()
}

export const getNotFollowingPosts = async (userId) => {
    const response = await fetch(`/api/follows/${userId}/unfollowed/posts`)
    return await response.json()
}

// Returns an object {} that contains whether or not a user is following
export const isFollowing = async (currentUserId, userId) => {
    const response = await fetch(`/api/follows/${currentUserId}/following/${userId}`)
    return await response.json()
}

// Returns users that are following this user
export const getFollowing = async (userId) => {
    const response = await fetch(`/api/follows/${userId}/following`)
    return await response.json()
}

// Returns users that a user is following
export const getFollowers = async (userId) => {
    const response = await fetch(`/api/follows/${userId}/followers`)
    return await response.json()
}

// Handles the following of a new user
export const followUser = async (followerId, followingId) => {
    const response = await fetch(`/api/follows/${followerId}/follow/${followingId}`, {
        method: 'POST',
    })
    return await response.json()
}
