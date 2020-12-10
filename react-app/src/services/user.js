export const getUser = async(userId) => {
    const response = await fetch(`/api/users/${userId}`)
    return await response.json()

}

export const getUserFollowers = async(userId) => {
    const response = await (fetch(`/api/users/follow/${userId}`))
    return await response.json()
}
