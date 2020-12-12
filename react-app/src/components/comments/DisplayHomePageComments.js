import React from 'react'
import {Link} from 'react-router-dom'

const DisplayHomePageComments = ({comment}) => {
    return (
        <div className="display_comments" key={comment.id}>
            <Link className="display_comments_router" to={`/user/${comment.user.id}`}>
                {comment.user.username}
            </Link>
            <div>{comment.message}</div>
        </div>
    )

}

export default DisplayHomePageComments
