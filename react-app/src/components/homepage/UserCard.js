import React from 'react'
import {useSelector} from 'react-redux'

const UserCard = () => {
    const currentUser = useSelector(state => state.users.user)

    return (
        <div className='usercard_container'>
            <img className='usercard_image' src={currentUser.profilePicture} alt=""/>
            <div className='usercard_titles'>
                <div>{currentUser.username}</div>
                <div>{currentUser.fullname}</div>
            </div>
        </div>
    )
}

export default UserCard
