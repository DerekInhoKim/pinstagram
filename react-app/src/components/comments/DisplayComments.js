import React from 'react'

const DisplayComments = ({comment}) => {
    return (
        <div>
            <img className='comment_image' src={comment.user.profilePicture} alt=""/>
            <span>{comment.message}</span>
            <span>{comment.user.username}</span>
        </div>
    )

}

export default DisplayComments
