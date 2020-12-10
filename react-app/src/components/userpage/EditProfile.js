import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom';
import {editUser} from '../../services/auth'
import {setUser} from '../../redux/actions/users'

const EditProfile = () => {
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [about, setAbout] = useState('');
    const [updated, setUpdated] = useState(false)
    const dispatch = useDispatch();

    const updateFullname = (e) => {
        setFullName(e.target.value);
    }

    const updateUsername = (e) => {
        setUserName(e.target.value);
    };

    const updateAbout = (e) => {
        setAbout(e.target.value);
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        const user = await editUser(fullName, userName, about)
        if (!user.errors){
            dispatch(setUser(user))
            setUpdated(true)
        }
    }

    if(updated){
        return <Redirect to="/"/>
    }

    return (
        <form onSubmit={handleEdit}>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          name="fullname"
          onChange={updateFullname}
          value={fullName}
        ></input>
      </div>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={userName}
        ></input>
      </div>
      <div>
      <label>About</label>
        <input
          type="textarea"
          name="about"
          onChange={updateAbout}
          value={about}
        ></input>
      </div>
      <button type="submit">Sign Up</button>
    </form>
    )
}

export default EditProfile
