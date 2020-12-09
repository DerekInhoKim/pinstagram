import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {getUser} from '../../services/user'
import {getPosts} from '../../services/post'
import {getFollowing, getFollowers, isFollowing} from '../../services/following'

const UserPageHeader = ({userId}) => {
    const currentUser = useSelector(state => state.users.user)

    const [user, setUser] = useState({})
    const [myPage, setMyPage] = useState(false)
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    const [posts, setPosts] = useState(0)
    const [isFollowingStatus, setIsFollowingStatus] = useState(false)

    // This use effect gets information for a user to use in the header
    useEffect(() => {
        (async () => {
            const userRes = await getUser(userId)
            setUser(userRes)

        })()
    },[userId])

    // This use effect gets all posts for a user. Set the number of posts as the posts
    useEffect(() => {
        (async () => {
            const postRes = await getPosts(userId)
            setPosts(postRes.posts.length)
        })()
    }, [userId])

    // This use effect will return all followers for a user
    useEffect(() => {
        (async () => {
            const followRes = await getFollowers(userId)
            setFollowers(followRes.follow.length)
        })()
    }, [userId])

    // This use effect will return all followings for a user
    useEffect(() => {
        (async () => {
            const followRes = await getFollowing(userId)
            setFollowing(followRes.follow.length)
        })()
    }, [userId])

    // This use effect checks to see if the currentuser is following the user
    useEffect(() => {
        (async () => {
            const followRes = await isFollowing(currentUser.id, userId)
            setIsFollowingStatus(followRes.following)
        })()
    }, [userId])

    useEffect(() => {
        if(currentUser.id === Number(userId)){
            setMyPage(true)
        }
    }, [userId])

    return (
        <div className="userpage_header_container">
            <img className="userpage_image" src={user.profilePicture} alt="user profile photo"/>
            <div className="userpage_header_text">
                <div>
                    {user.username} {myPage ? '' : isFollowingStatus ? 'Following' : 'Follow'}
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
