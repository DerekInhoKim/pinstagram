import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {uploadImage} from '../../services/post'
import {setPicture} from '../../services/user'

const ProfilePictureUpload = () => {
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
        <div className="modal">
            <form encType='multipart/formdata' onSubmit={submitProfilePicture}>
                <label htmlFor="user_file">Upload Your File</label>
                <input type="file" name="user_file" required onChange={setImageHelper}/>
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}

export default ProfilePictureUpload
