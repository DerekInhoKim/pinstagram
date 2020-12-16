import React, {useState, useRef, useCallback} from "react";
import Webcam from "react-webcam";
import {useSelector} from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const videoConstraints = {
    width: 600,
    height: 600,
    facingMode: "user"
};

const WebcamComponent = () => {
    const currentuser = useSelector(state => state.users.user)
    const webcamRef = useRef(null)
    const [imgSrc, setImgSrc] = useState(null)
    const [file, setFile] = useState({})

    const capture = useCallback(
        () => {
            setImgSrc(webcamRef.current.getScreenshot()
            )
        },
        [webcamRef]
    )

    if(imgSrc){
        console.log(imgSrc)
    }

    return (
        <div>
            <div>
                <h1>Webcam</h1>
                <Webcam
                audio={false}
                height={600}
                width={600}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                />
                <button onClick={capture}>Capture Photo</button>
            </div>
            <div>
                <form encType='multipart/formdata'>
                    {/* <TextField
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
                    <TextField fullWidth variant="outlined" type="file" name="user_file" required onChange={setImageHelper}/>
                    <Button className="edit_button" color="primary" variant="contained" type="submit">Post</Button> */}
                </form>
            </div>

        </div>
    )
}

export default WebcamComponent
