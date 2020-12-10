import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import DisplayPostContent from './DisplayPostContent'

const DisplayPostPage = () => {
    const post = useSelector(state => state.posts)

    return (
        <div className='postpage_post_container'>
            <div>
                <img className='postpage_post_image' src={post.content} alt="post content"/>
            </div>
            <DisplayPostContent />
        </div>
    )
}

export default DisplayPostPage
