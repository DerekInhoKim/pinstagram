import React, {useState, useEffect} from 'react'
import PostHeader from './PostHeader'
import {getPostLikes, likePost, userLikesPost, dislikePost} from '../../services/likes'
import {useSelector} from 'react-redux'
import {getComments} from '../../services/comments'
import DisplayComments from '../comments/DisplayComments'
import CommentForm from '../comments/CommentForm'

const DisplayPostContent = () => {
    const currentUser = useSelector(state => state.users.user)
    const post = useSelector(state => state.posts)
    const postUser = useSelector(state => state.postUser)
    const currentComments = useSelector(state => state.comments)

    const [likes, setLikes] = useState([])
    const [userLike, setUserLike] = useState(false)
    const [comments, setComments] = useState([])
    const [mounted, setMounted] = useState(false)


    // This use effect sends a request to see if a user is already liking a post.
    // If a user already likes a post, it displays the liked post version of the post.
    useEffect(() => {
        (async () => {
            const likesResponse = await userLikesPost(post.id, currentUser.id)
            setUserLike(likesResponse.likes)
        })()
    }, [post.id])

    // This use effect sends a request to get the number of likes for a post
    useEffect(() => {
        (async () => {
            const likesResponse = await getPostLikes(post.id)
            setLikes(likesResponse.like)
        })()
    }, [userLike, post.id])

    // This use effects fires off a request to grab all comments for a post
    // Pass in the currentComments in the dependency array
    // When the comment slice of store changes, it will fire off this request again.
    // Comment slice of state is currently not functioning ideally.
    // Deleting a comment will need to be flushed out more thoroughly
    useEffect(() => {
        if(mounted) {
            (async () => {
                const commentsResponse = await getComments(post.id)
                setComments(commentsResponse.comments)
            })()
        }
    }, [currentComments, post.id])

    useEffect(() => {
        setMounted(true)
    }, [post.id])


    // Used to display each comment
    const commentComponent = comments.map(comment => {
        return (
            <DisplayComments key={comment.id} comment={comment}/>
        )
    })

    // Handles the button click when a user likes a post
    const handleLike = async () => {
        const response = await likePost(post.id, currentUser.id)
        if (response.error) {
            alert(response.error)
        }
        setUserLike(true)
    }

    // Handles the button click when a user dislikes/unlikes a post
    const handleDislike = async () => {
        const response = await dislikePost(post.id, currentUser.id)
        setUserLike(false)
    }

    if(mounted === false){
        return (
            <h1>loading</h1>
        )
    }

    if (!post){
        return (
            null
        )
    }

    return (
        <div>
            <PostHeader />
            {/* Post caption should be styled seperately. similarly to a comment */}
            <h1>{post.caption}</h1>
            <h3>{post.createdAt}</h3>
            <h3>{likes.length}</h3>
            <div>
                {userLike === true ?
                <button onClick={handleDislike}>Unlike</button> :
                <button onClick={handleLike}>Like</button>
                }
            </div>
            <div>{commentComponent}</div>
            <CommentForm postId={post.id}/>
        </div>
    )
}

export default DisplayPostContent
