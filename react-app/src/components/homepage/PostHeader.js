import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {isFollowing, followUser} from '../../services/following'
import {Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    buttonStyle: {
        fontWeight: "bold",
        color: "black"
    }
})

// Different than Post Page Post header in the way that the user is being passed as a prop
const PostHeader = ({user}) => {
    const currentUser = useSelector(state => state.users.user)
    const [following, setFollowing] = useState(false)
    const [isFollowingState, setIsFollowingState] = useState(false)

    const classes = useStyles()

    // Sends a request to see if a user is following the user
    useEffect(() => {
        (async () => {
            const followingResponse = await isFollowing(currentUser.id, user.id)
            setFollowing(followingResponse.following)
        })()
    }, [user.id, isFollowingState])

    // Sends a request to create a new following between two users
    // isFollowingState is used to prevent infinite loop in the use effect when the following status is changed
    const handleFollow = async () => {
        const followingStatus = await followUser(currentUser.id, user.id)
        setIsFollowingState(followingStatus)
    }

    return (
        <div className="post_header">
            <Link className="post_header_link" to={`/user/${user.id}`}>
                <img className="post_header_image" src={user.profilePicture} alt=""/>
                <div className="post_header_username">{user.username}</div>
            </Link>
            <div className="post_header_follow">{following ?
                <Button className={classes.buttonStyle}  onClick={handleFollow}>Following</Button> :
                <Button className={classes.buttonStyle}  onClick={handleFollow}>Follow</Button>}
            </div>
        </div>
    )
}

export default PostHeader
