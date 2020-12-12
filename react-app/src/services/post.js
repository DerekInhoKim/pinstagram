// Returns a post based on the postId passed in
export const getPost = async (postId) => {
    const response = await fetch(`/api/posts/${postId}`)
    return await response.json()
}

// Returns all posts for a specific user
export const getPosts = async (userId) => {
    const response = await fetch(`/api/posts/user/${userId}`)
    return await response.json()

}

export const getPinnedPosts = async(userId) => {
  const response = await fetch(`/api/posts/user/${userId}/pinned`)
  return await response.json()
}

export const createPost = async(caption, imageUrl) => {
    const response = await fetch('/api/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        caption,
        content: imageUrl,
      })
    });
    return await response.json()
}

export const uploadImage = async (data) => {
    const res = await fetch('/api/s3/upload', {
      method: 'POST',
      body: data
    })

    return await res.json()
}
