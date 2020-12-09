export const getFollowingPosts = async (userId) => {
    const response = await fetch(`/api/follows/${userId}/posts`)
    return await response.json()
}

export const isFollowing = async (currentUserId, userId) => {
    const response = await fetch(`/api/follows/${currentUserId}/following/${userId}`)
    return await response.json()
}

export const getFollowing = async (userId) => {
    const response = await fetch(`/api/follows/${userId}/following`)
    return await response.json()
}

export const getFollowers = async (userId) => {
    const response = await fetch(`/api/follows/${userId}/followers`)
    return await response.json()
}
