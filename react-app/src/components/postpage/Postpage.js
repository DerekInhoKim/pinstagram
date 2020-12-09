import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {setPostStore} from '../../redux/actions/posts'
import {setPostUser} from '../../redux/actions/postUser'
import DisplayPostPage from './DisplayPostPage'
import {getPost} from '../../services/post'

const PostPage = () => {
    const postStore = useSelector(state => state.posts)
    const {postId} = useParams();
    const dispatch = useDispatch();

    // Use effect will set the local state of the post that we're looking at
    useEffect(() => {
        (async () => {
            // debugger
            const post = await getPost(postId)
            if (post){
                dispatch(setPostStore(post.post))
                dispatch(setPostUser(post.post.user))

            }
        })()
    }, [postId])


    return (
        <div className='postpage_post'>
            <DisplayPostPage/>
            {/* Consider rendering more posts from this user */}
        </div>
    )
}

export default PostPage
