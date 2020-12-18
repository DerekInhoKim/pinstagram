import React, {useState, useRef, useCallback, useEffect} from "react";
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
    const [caption, setCaption] = useState("")

    // This file takes the base64 encoded data from the webcam, and converts it to a file to send to S3.
    function dataURLtoFile(dataurl, filename) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, {type:mime});
    }

    const capture = useCallback(
        () => {
            setImgSrc(webcamRef.current.getScreenshot())
        },
        [webcamRef]
    )

    useEffect(() => {
        if(imgSrc ){
            setCaption(imgSrc.slice(30, 50) + imgSrc.slice(60, 80))
            const filz = dataURLtoFile(imgSrc, "myfilename")
            console.log(filz)

        }
    },[imgSrc])

    // if(imgSrc){
    //     // console.log(imgSrc)
    //     // setCaption(imgSrc.slice(0, 20))
    // }

    // if(caption){
    //     console.log(caption)
    // }

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
                    <TextField
                            name='caption'
                            type='text'
                            label="Caption"
                            variant="outlined"
                            placeholder='Tell us about your image...'
                            value={caption}
                            required
                            fullWidth
                            />
                    {/* <TextField fullWidth variant="outlined" type="file" name="user_file" required onChange={setImageHelper}/>
                    <Button className="edit_button" color="primary" variant="contained" type="submit">Post</Button> */}
                </form>
            </div>

        </div>
    )
}

export default WebcamComponent
