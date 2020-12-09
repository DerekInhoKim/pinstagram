import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {isFollowing, followUser} from '../../services/following'

const PostHeader = () => {
    const currentUser = useSelector(state => state.users.user)
    const postUser = useSelector(state => state.postUser)
    const [following, setFollowing] = useState(false)


    useEffect(() => {
        (async () => {
            const followingResponse = await isFollowing(currentUser.id, postUser.id)
            setFollowing(followingResponse.following)
        })()
    }, [postUser.id])

    // Sends a request to create a new following between two users
    const handleFollow = async () => {
        followUser(currentUser.id, postUser.id)
    }

    return (
        <div className="post_header">
            <img className="post_header_image" src={postUser.profilePicture} alt=""/>
            <span className="post_header_username">{postUser.username}</span>
            <span>{following ?
            <button onClick={handleFollow}>Following</button> :
            <button onClick={handleFollow}>Follow</button>}</span>
        </div>
    )
}

export default PostHeader
