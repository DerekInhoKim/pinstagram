import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {isFollowing} from '../../services/following'

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

    if (!postUser){
        return (
            null
        )
    }

    return (
        <div className="post_header">
            <img className="post_header_image" src={postUser.profilePicture} alt=""/>
            <span className="post_header_username">{postUser.username}</span>
            <span>{following ? 'Following' : 'Follow'}</span>
        </div>
    )
}

export default PostHeader
