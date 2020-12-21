import React, {useState} from 'react'
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import {uploadImage, createPost} from '../../services/post'
import NavBar from '../NavBar'

const CreatePost = ({setAuthenticated}) => {

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
        console.log(image)

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
        <div className="top_userpage_container">
            <NavBar setAuthenticated={setAuthenticated}/>
            <div className="createpost_container">
                <div className="createpost_container_center">
                    <div className="createpost_header">
                        Create Post
                    </div>
                    <form encType='multipart/formdata' onSubmit={submitImagePost} className='submit_form'>
                        {/* <div> */}
                            <TextField
                            name='caption'
                            type='text'
                            label="Caption"
                            variant="outlined"
                            placeholder='Tell us about your image...'
                            value={caption}
                            onChange={updateValue(setCaption)}
                            required
                            fullWidth
                            />
                        {/* </div> */}
                        <TextField fullWidth variant="outlined" type="file" name="user_file" required onChange={setImageHelper}/>
                        <Button className="edit_button" color="primary" variant="contained" type="submit">Post</Button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default CreatePost
