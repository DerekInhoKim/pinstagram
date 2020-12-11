import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'


const UserCard = () => {
    const currentUser = useSelector(state => state.users.user)

    return (
        <div className='usercard_container'>
            <Link to={`/user/${currentUser.id}`}>
                <img className='usercard_image' src={currentUser.profilePicture} alt=""/>
            </Link>
            <div className='usercard_titles'>
                <Link to={`/user/${currentUser.id}`}>
                    <div className='usercard_username'>{currentUser.username}</div>
                </Link>
                <div className='usercard_fullname'>{currentUser.fullname}</div>
            </div>
        </div>
    )
}

export default UserCard
