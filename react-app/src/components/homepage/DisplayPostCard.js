import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import PostHeader from './PostHeader'
import DisplayHomePageComments from '../comments/DisplayHomePageComments'
import CommentForm from '../comments/CommentForm'
import {getPostLikes, likePost, userLikesPost, dislikePost} from '../../services/likes'
import {getComments} from '../../services/comments'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import FiberPinIcon from '@material-ui/icons/FiberPin';
import {makeStyles} from '@material-ui/core'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const useStyles = makeStyles({
    card: {
        maxWidth: "60rem",
    }
})

const DisplayPost = ({id, caption, content, createdAt, user}) => {
    const currentUser = useSelector(state => state.users.user)
    const currentComments = useSelector(state => state.comments)

    const classes = useStyles()

    const [likes, setLikes] = useState([])
    const [userLike, setUserLike] = useState(false)
    const [comments, setComments] = useState([])

    // This use effect sends a request to see if a user is already liking a post.
    // If a user already likes a post, it displays the liked post version of the post.
    useEffect(() => {
        (async () => {
            const likesResponse = await userLikesPost(id, currentUser.id)
            setUserLike(likesResponse.likes)
        })()
    }, [id])


    // This use effect sends a request to get the number of likes for a post
    useEffect(() => {
        (async () => {
            const likesResponse = await getPostLikes(id)
            setLikes(likesResponse.like)
        })()
    }, [userLike, id])

    // This use effects fires off a request to grab all comments for a post
    // Pass in the currentComments in the dependency array
    // When the comment slice of store changes, it will fire off this request again.
    // Comment slice of state is currently not functioning ideally.
    // Deleting a comment will need to be flushed out more thoroughly
    useEffect(() => {
        (async () => {
            const commentsResponse = await getComments(id)
            setComments(commentsResponse.comments)
        })()
    }, [currentComments])


    // Handles the button click when a user likes a post
    const handleLike = async () => {
        const response = await likePost(id, currentUser.id)
        if (response.error) {
            alert(response.error)
        }
        setUserLike(true)
    }

    // Handles the button click when a user dislikes/unlikes a post
    const handleDislike = async () => {
        const response = await dislikePost(id, currentUser.id)
        setUserLike(false)
    }

    // Used to display each comment

    const commentComponent = comments.slice(0,3).map(comment => {
        return (
            <DisplayHomePageComments key={comment.id} comment={comment}/>
        )
    })


    return (
        <Card className="homepage_post">
            <PostHeader user={user}/>
            <Link to={`/p/${id}`}>
                <CardMedia className="homepage_post_image" image={content} alt="content"/>
            </Link>
            <div className="homepage_post_content_container_width">
                <div className="homepage_post_content_container">
                    <div className="homepage_post_date">
                        {formatDistanceToNow(new Date(createdAt))} ago
                    </div>
                    <div className="homepage_post_likes">
                        {likes.length} pins
                        <IconButton>
                            {userLike === true ?
                            <FiberPinIcon style={{fill:"red"}} onClick={handleDislike}>unPin</FiberPinIcon> :
                            <FiberPinIcon style={{fill: "gray"}} onClick={handleLike}>Pin</FiberPinIcon>
                        }
                        </IconButton>
                    </div>
                    <div className="homepage_post_user_info"><span className="homepage_post_user_title">{user.username}</span> <span className="homepage_post_user_caption">{caption}</span></div>
                    <div className="comments_container">
                        <Link to={`/p/${id}`}>
                            <div className="comment_total_link">
                                view all {comments.length} comments
                            </div>
                        </Link>
                        <div className="comments_post_container">{commentComponent}</div>
                        <CommentForm postId={id}/>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default DisplayPost
