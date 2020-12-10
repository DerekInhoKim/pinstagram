import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {getUser} from '../../services/user'
import {getPosts} from '../../services/post'
import {getFollowing, getFollowers, isFollowing, followUser} from '../../services/following'

const UserPageHeader = ({userId}) => {
    const currentUser = useSelector(state => state.users.user)

    const [user, setUser] = useState({})
    const [myPage, setMyPage] = useState(false)
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    const [posts, setPosts] = useState(0)

    // isFollowingState and isFollowingStatus are used to prevent infinite looping of useEffect
    const [isFollowingState, setIsFollowingState] = useState(false)
    const [isFollowingStatus, setIsFollowingStatus] = useState(false)

    // This use effect will return all followings for a user
    useEffect(() => {
        (async () => {

            // Sets the user information
            const userRes = await getUser(userId)
            setUser(userRes)

            // Sets the number of users this user is following
            const followingRes = await getFollowing(userId)
            setFollowing(followingRes.follow.length)

            // Sets the number of followers the user has
            const followRes = await getFollowers(userId)
            setFollowers(followRes.follow.length)

            // Sets the number of posts this user has posted
            const postRes = await getPosts(userId)
            setPosts(postRes.posts.length)

            // Checks to see if this is the current user's page
            if(currentUser.id === Number(userId)){
                setMyPage(true)
            }
        })()
    }, [userId])

    // This use effect checks to see if the currentuser is following the user
    useEffect(() => {
        (async () => {
            const followRes = await isFollowing(currentUser.id, userId)
            setIsFollowingStatus(followRes.following)
        })()
    }, [userId, isFollowingState])


    const handleFollow = async () => {
        const followingStatus = await followUser(currentUser.id, Number(userId))
        setIsFollowingState(followingStatus)
    }

    return (
        <div className="userpage_header_container">
            <img className="userpage_image" src={user.profilePicture} alt="user profile photo"/>
            <div className="userpage_header_text">
                <div>
                    {user.username} {myPage ? '' : isFollowingStatus ?
                    <button onClick={handleFollow}>Following</button> :
                    <button onClick={handleFollow}>Follow</button>}
                </div>
                <div>
                    posts {posts} followers {followers} following {following}
                </div>
                <div>
                    {user.fullname}
                </div>
            </div>
        </div>
    )
}

export default UserPageHeader
