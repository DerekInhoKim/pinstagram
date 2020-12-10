import React from 'react'
import {Link} from 'react-router-dom'

const DisplayComments = ({comment}) => {
    return (
        <div key={comment.id}>
            <Link to={`/user/${comment.user.id}`}>
                <img className='comment_image' src={comment.user.profilePicture} alt=""/>
                <div>{comment.user.username}</div>
            </Link>

            <div>{comment.message}</div>
        </div>
    )

}

export default DisplayComments
