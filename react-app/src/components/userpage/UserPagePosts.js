import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {getPosts, getPinnedPosts} from '../../services/post'
import IconButton from '@material-ui/core/IconButton';
import FiberPinIcon from '@material-ui/icons/FiberPin';
import AppsIcon from '@material-ui/icons/Apps';

const UserPagePosts = ({userId}) => {
    const [posts, setPosts] = useState([])
    const [pinnedPosts, setPinnedPosts] = useState([])
    const [status, setStatus] = useState('posts')


    useEffect(() => {
        (async () => {
            const postResponse = await getPosts(userId)
            setPosts(postResponse.posts)

            const pinnedPostResponse = await getPinnedPosts(userId)
            setPinnedPosts(pinnedPostResponse.posts)

        })()
    }, [])

    const postsComponent = posts.map(post => {
        return (
            <div key={post.id} className="userpage_post_image_container">
                <Link to={`/p/${post.id}`}>
                    <img className="userpage_post_image" src={post.content} alt="postImage"/>
                </Link>
            </div>
        )
    })

    const pinnedComponent = pinnedPosts.map(post => {
        return (
            <div key={post.id} className="userpage_post_image_container">
                <Link to={`/p/${post.id}`}>
                    <img className="userpage_post_image" src={post.content} alt="postImage"/>
                </Link>
            </div>
        )
    })

    const handlePost = () => {
        console.log('post')
        setStatus('posts')
    }

    const handlePinned = () => {
        console.log('pinned')
        setStatus('pinned')
    }

    if(status === 'pinned'){
        return (
            <div className="userpage_post_container">
                <div className="userpage_post_tabs">
                    <IconButton onClick={handlePost}>
                            <AppsIcon ></AppsIcon>  Posts
                    </IconButton>
                    <IconButton onClick={handlePinned}>
                        <FiberPinIcon style={{fill:"red"}} ></FiberPinIcon> Pinned
                    </IconButton>
                </div>
                <div className="userpage_post_component_container">
                    {pinnedComponent}
                </div>
            </div>
        )
    }


    return (
        <div className="userpage_post_container">
            <div className="userpage_post_tabs">
                <IconButton onClick={handlePost}>
                    <AppsIcon style={{fill:"lightblue"}}></AppsIcon>  Posts
                </IconButton>
                <IconButton onClick={handlePinned}>
                    <FiberPinIcon ></FiberPinIcon> Pinned
                </IconButton>
            </div>
            <div className="userpage_post_component_container">
                {postsComponent}
            </div>
        </div>
    )
}

export default UserPagePosts
