import React from 'react'
import {useParams} from 'react-router-dom'
import UserPageHeader from './UserPageHeader'
import UserPagePosts from './UserPagePosts'
import NavBar from '../NavBar'


const UserPage = ({setAuthenticated}) => {
    const {userId} = useParams()

    return (
        <div className="top_userpage_container">
            <NavBar setAuthenticated={setAuthenticated}/>
            <div className="userpage_container">
                <UserPageHeader userId={userId} />
                <UserPagePosts userId={userId}/>
            </div>
        </div>
    )
}

export default UserPage
