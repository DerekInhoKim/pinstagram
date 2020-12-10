import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {isFollowing, followUser} from '../../services/following'

const PostHeader = () => {
    const currentUser = useSelector(state => state.users.user)
    const postUser = useSelector(state => state.postUser)
    const [following, setFollowing] = useState(false)
    const [isFollowingState, setIsFollowingState] = useState(false)


    useEffect(() => {
        (async () => {
            const followingResponse = await isFollowing(currentUser.id, postUser.id)
            setFollowing(followingResponse.following)
        })()
    }, [postUser.id, isFollowingState])

    // Sends a request to create a new following between two users
    // isFollowingState is used to prevent infinite loop in the use effect when the following status is changed
    const handleFollow = async () => {
        const followingStatus = await followUser(currentUser.id, postUser.id)
        setIsFollowingState(followingStatus)
    }

    return (
        <div className="post_header">
            <Link to={`/user/${postUser.id}`}>
                <img className="post_header_image" src={postUser.profilePicture} alt=""/>
                <span className="post_header_username">{postUser.username}</span>
            </Link>
            <span>{following ?
            <button onClick={handleFollow}>Following</button> :
            <button onClick={handleFollow}>Follow</button>}</span>
        </div>
    )
}

export default PostHeader
