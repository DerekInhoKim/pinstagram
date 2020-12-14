import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {isFollowing, followUser} from '../../services/following'
import {Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    buttonStyle: {
        fontWeight: "bold",
        color: "lightblue",
        marginLeft: "1rem"
    }
})


const PostHeader = () => {
    const currentUser = useSelector(state => state.users.user)
    const postUser = useSelector(state => state.postUser)
    const [following, setFollowing] = useState(false)
    const [isFollowingState, setIsFollowingState] = useState(false)

    const classes = useStyles()

    useEffect(() => {
        (async () => {
            const followingResponse = await isFollowing(currentUser.id, postUser.id)
            setFollowing(followingResponse.following)
        })()
    }, [postUser.id, isFollowingState])

    // Sends a request to create a new following between two users
    // isFollowingState is used to prevent infinite loop in the use effect when the following status is changed
    const handleFollow = async () => {
        const followingStatus = await followUser(currentUser.id, postUser.id)
        setIsFollowingState(followingStatus)
    }

    return (
        <div className="post_header">
            <Link to={`/user/${postUser.id}`}>
                <img className="post_header_image" src={postUser.profilePicture} alt=""/>
            </Link>
            <Link to={`/user/${postUser.id}`}>
                <div className="post_header_username">{postUser.username}</div>
            </Link>
            <div>{following ?
            <Button className={classes.buttonStyle} onClick={handleFollow}>Following</Button> :
            <Button className={classes.buttonStyle} onClick={handleFollow}>Follow</Button>}
            </div>
        </div>
    )
}

export default PostHeader
