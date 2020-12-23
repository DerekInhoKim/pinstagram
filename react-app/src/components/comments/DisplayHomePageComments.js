import React from 'react'
import {Link} from 'react-router-dom'

const DisplayHomePageComments = ({comment}) => {
    return (
        <div className="display_comments" key={comment.id}>
            <Link className="display_comments_router" to={`/user/${comment.user.id}`}>
                <div className="display_comment_username">
                    {comment.user.username}
                </div>
            </Link>
            <div className="display_comment_comment">{comment.message}</div>
        </div>
    )

}

export default DisplayHomePageComments
