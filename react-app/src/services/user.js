export const getUser = async(userId) => {
    const response = await fetch(`/api/users/${userId}`)
    return await response.json()

}

export const getUserFollowers = async(userId) => {
    const response = await (fetch(`/api/users/follow/${userId}`))
    return await response.json()
}

export const setPicture = async(imageUrl) => {
    const response = await fetch('/api/users/profilePicture', {
        method:"PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            profilePicture: imageUrl
        })
    })
    return await response.json()
}
