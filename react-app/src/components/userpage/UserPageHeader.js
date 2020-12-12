import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {getUser} from '../../services/user'
import {getPosts} from '../../services/post'
import {Button} from '@material-ui/core'
import {getFollowing, getFollowers, isFollowing, followUser} from '../../services/following'
import emptyPicture from '../../images/blank-profile-picture.png'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    buttonStyle: {
        fontWeight: "bold",
        color: "lightblue"
    }
})

const UserPageHeader = ({userId}) => {
    const currentUser = useSelector(state => state.users.user)
    let history = useHistory()

    const classes = useStyles()

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
            // Sets the number of followers the user has
            const followerRes = await getFollowers(userId)
            setFollowers(followerRes.follow.length)

            const followRes = await isFollowing(currentUser.id, userId)
            setIsFollowingStatus(followRes.following)
        })()
    }, [userId, isFollowingState])


    const handleFollow = async () => {
        const followingStatus = await followUser(currentUser.id, Number(userId))
        setIsFollowingState(followingStatus)
    }

    const handleProfilePicture = () => {
        history.push('/profilePicture')

    }

    const handleEdit = () => {
        history.push('/edit/profile')
    }

    // src={user.profilePicture ? user.profilePicture : "Mymushi.jpg"}

    return (
        <div className="userpage_header_container">
            <div className="userpage_image_container" >
                {myPage ?
                <div className="my_userpage_image_text">Change Photo</div> :
                <div className="my_userpage_image_text"></div>}
                <img onClick={myPage ? handleProfilePicture : null } className={myPage ? "my_userpage_image" : "userpage_image"} src={user.profilePicture ? user.profilePicture : emptyPicture} alt="user profile photo"/>
            </div>
            <div className="userpage_header_text">
                <div>
                    {user.username} {myPage ? '' : isFollowingStatus ?
                    <Button className={classes.buttonStyle} onClick={handleFollow}>Following</Button> :
                    <Button className={classes.buttonStyle} onClick={handleFollow}>Follow</Button>}
                    {myPage ? <Button variant="outlined" onClick={handleEdit}>edit</Button> : ''}
                </div>
                <div>
                    posts {posts} followers {followers} following {following}
                </div>
                <div>
                    {user.fullname}
                </div>
                <div>
                    {user.about}
                </div>
            </div>
        </div>
    )
}

export default UserPageHeader
