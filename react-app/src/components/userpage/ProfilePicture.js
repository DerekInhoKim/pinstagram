import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {uploadImage} from '../../services/post'
import {setPicture} from '../../services/user'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import NavBar from '../NavBar'

const ProfilePictureUpload = ({setAuthenticated}) => {
    const currentUser = useSelector(state => state.users.user)
    const [image, setImage] = useState({})
    let history = useHistory()

    const setImageHelper = (e) => {
        setImage(e.target.files[0])
    }

    const submitProfilePicture = async (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append("file", image)

        const newImage = await uploadImage(data)
        const imageUrl = newImage.output

        const user = await setPicture(imageUrl)
        if(user){
            history.push(`/user/${currentUser.id}`)
        }


    }

    return (
        <div className="top_userpage_container">
            <NavBar setAuthenticated={setAuthenticated}/>
            <div className="update_profile_picture_container">
                <div className="update_profile_picture_center">
                    <div className="update_profile_picture_header">
                        Update Profile Picture
                    </div>
                    <div className="update_profile_picture_title">
                        choose a photo to upload
                    </div>
                    <form className="update_profile_picture_form" encType='multipart/formdata' onSubmit={submitProfilePicture}>
                        <TextField fullWidth variant="outlined" type="file" name="user_file" required onChange={setImageHelper}/>
                        <Button className="edit_button" color="primary" variant="contained" type="submit">Upload</Button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default ProfilePictureUpload
