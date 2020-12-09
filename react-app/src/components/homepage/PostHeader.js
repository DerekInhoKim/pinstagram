import React from 'react'

const PostHeader = ({user}) => {
    return (
        <div className="post_header">
            <img className="post_header_image" src={user.profilePicture} alt=""/>
            <span className="post_header_username">{user.username}</span>
        </div>
    )
}

export default PostHeader
