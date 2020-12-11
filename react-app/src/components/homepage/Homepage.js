import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {getFollowingPosts} from '../../services/following'
import DisplayPost from './DisplayPost'
import UserCard from './UserCard'

const HomePage = () => {
    const currentUser = useSelector(state => state.users.user)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if(currentUser){
            (async () => {
                const postList = await getFollowingPosts(currentUser.id)
                setPosts(postList.posts)
            })()
        }
    }, [currentUser])

    const postComponent = posts.map((post) => {
        return (
            <DisplayPost key={post.id} id={post.id} caption={post.caption} content={post.content} createdAt={post.createdAt} user={post.user}/>
        )
    })

    if(!currentUser){
        return (
            <h1>Store is configured poorly</h1>
        )
    }
    return (
        <div className="homepage_container">
            <div className="homepage_center_container">
                <div className="homepage_post_container">
                    {postComponent}
                </div>
                <div className="homepage_user_container">
                    <UserCard />
                </div>
            </div>
        </div>
    )

}

export default HomePage
