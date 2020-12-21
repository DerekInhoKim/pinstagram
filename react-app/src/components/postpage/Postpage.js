import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {setPostStore} from '../../redux/actions/posts'
import {setPostUser} from '../../redux/actions/postUser'
import DisplayPostPage from './DisplayPostPage'
import {getPost} from '../../services/post'
import NavBar from '../NavBar'

const PostPage = ({setAuthenticated}) => {
    const postStore = useSelector(state => state.posts)
    const {postId} = useParams();
    const dispatch = useDispatch();

    // Use effect will set the local state of the post that we're looking at
    useEffect(() => {
        (async () => {
            const post = await getPost(postId)
            if (post){
                dispatch(setPostStore(post.post))
                dispatch(setPostUser(post.post.user))

            }
        })()
    }, [postId])


    return (
        <div className="top_userpage_container">
            <NavBar setAuthenticated={setAuthenticated} />
            <div className='postpage_post'>
                <DisplayPostPage/>
            </div>
        </div>
    )
}

export default PostPage
