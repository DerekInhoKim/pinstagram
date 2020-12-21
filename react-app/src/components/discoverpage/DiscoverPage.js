import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {getNotFollowingPosts} from '../../services/following'
import {useSelector} from 'react-redux'
import NavBar from '../NavBar'

const DiscoverPage = ({setAuthenticated}) => {
    const currentUser = useSelector(state => state.users.user)
    const following = useSelector(state => state.following)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        (async () => {
            const postsResponse = await getNotFollowingPosts(currentUser.id)
            setPosts(postsResponse.posts)
        })()
    },[])

    const postComponent = posts.map(post => {
        return (
            <div className="userpage_post_image_container" key={post.id}>
                <Link to={`/p/${post.id}`}>
                    <img className="userpage_post_image" src={post.content} alt="post image"/>
                </Link>
            </div>
        )
    })

    return (
        <div className="top_userpage_container">
            <NavBar setAuthenticated={setAuthenticated}/>
            <div className="discover_page_container">
                <div className="discover_page_post_container">
                    {postComponent}
                </div>
            </div>
        </div>
    )
}

export default DiscoverPage
