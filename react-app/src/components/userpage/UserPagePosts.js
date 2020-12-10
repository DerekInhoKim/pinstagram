import React, {useState, useEffect} from 'react'
import {getPosts} from '../../services/post'

const UserPagePosts = ({userId}) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        (async () => {
            const postResponse = await getPosts(userId)
            setPosts(postResponse.posts)
        })()
    }, [])

    const postsComponent = posts.map(post => {
        return (
            <div className="userpage_post_image_container">
                <img className="userpage_post_image" src={post.content} alt="postImage"/>
            </div>
        )
    })


    return (
        <div className="userpage_post_container">
            {postsComponent}
        </div>
    )
}

export default UserPagePosts
