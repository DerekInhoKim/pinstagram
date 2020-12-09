import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

const PostHeader = ({user}) => {
    const following = useSelector(state => state.following)
    const [isFollowing, setIsFollowing] = useState(false)

    useEffect(() => {
        for (const followingUser of following) {
            if (followingUser.id === user.id) {
                setIsFollowing(true)
            }
        }
    },[])

    return (
        <div className="post_header">
            <img className="post_header_image" src={user.profilePicture} alt=""/>
            <span className="post_header_username">{user.username}</span>
            <div>{isFollowing ? 'Following' : 'Follow'}</div>
        </div>
    )
}

export default PostHeader
