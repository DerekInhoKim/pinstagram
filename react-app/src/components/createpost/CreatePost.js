import React, {useState} from 'react'
import { Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux'
import {uploadImage, createPost} from '../../services/post'

const CreatePost = () => {

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState({})
    const [redirect, setRedirect] = useState(false)

    const updateValue = (setfunc) => (e) => {
        setfunc(e.target.value)
      }

    const setImageHelper = (e) => {
        setImage(e.target.files[0])

    }

    const submitImagePost = async (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append("file", image)

        const newImage = await uploadImage(data)
        const imageUrl = newImage.output

        const post = await createPost( caption, imageUrl);
        if(!post.errors){
            setRedirect(true)

        }
    }

    if(redirect){
        return <Redirect to={`/`} />
    }

    return (
        <form encType='multipart/formdata' onSubmit={submitImagePost} className='submit-form'>
            <div>
                <label htmlFor='caption'>Caption</label>
                <input
                name='caption'
                type='text'
                placeholder='Tell us about your image...'
                value={caption}
                onChange={updateValue(setCaption)}
                required
                />
            </div>
            <label htmlFor="user_file">Upload Your File</label>
            <input type="file" name="user_file" required onChange={setImageHelper}/>
            <button type="submit">Upload</button>
        </form>
    )
}

export default CreatePost
