import React, {useState, useRef, useCallback, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import Webcam from "react-webcam";
import {useSelector} from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {uploadImage, createPost, getPosts} from '../../services/post'

const videoConstraints = {
    width: 600,
    height: 600,
    facingMode: "user"
};

const WebcamComponent = () => {
    const currentUser = useSelector(state => state.users.user)
    const webcamRef = useRef(null)
    const [imgSrc, setImgSrc] = useState(null)
    const [image, setImage] = useState({})
    const [fileName, setFileName] = useState("")
    const [caption, setCaption] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [posts, setPosts] = useState(0)
    const [test, setTest] = useState("testing now")

    useEffect(() => {
        (async () => {
            const allPosts = await getPosts(currentUser.id)
            setPosts(allPosts.posts.length)
            // console.log(allPosts.posts.length)
            // setTest("Working now")
            // debugger
        })()
    },[currentUser.id])

    useEffect(() => {
        (async () => {
            if(imgSrc && posts){
                // await setPosts(posts + 1)
                setFileName(currentUser.fullname + posts.toString())
            }

        })()
    },[imgSrc])

    useEffect(() => {
        if(fileName){
            setImage(dataURLtoFile(imgSrc, fileName))
        }
    }, [fileName, imgSrc])

    // This file takes the base64 encoded data from the webcam, and converts it to a file to send to S3.
    const dataURLtoFile = (dataurl, filename) => {

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

    const updateValue = (setfunc) => (e) => {
        setfunc(e.target.value)
    }

    const capture = useCallback(
        () => {
            setImgSrc(webcamRef.current.getScreenshot())
            // console.log("No posts", posts)
            // console.log(test)
            // setImagePreview(webcamRef.current.getScreenshot())
        },[webcamRef])

    const submitImagePost = async (e) => {
        e.preventDefault();
        const data = new FormData();
        // debugger
        data.append("file", image)
        console.log(image)

        const newImage = await uploadImage(data)
        const imageUrl = newImage.output

        const post = await createPost( caption, imageUrl);
        if(!post.errors){
            setRedirect(true)

        } else {
            console.log('something went wrong', image)
        }
    }

    if(redirect){
        return <Redirect to={`/`} />
    }

    // if(posts !== 0){
    //     console.log("posts here, ", posts)
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
                <form encType='multipart/formdata' onSubmit={submitImagePost}>
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
                    {/* <TextField fullWidth variant="outlined" type="file" name="user_file" required onChange={setImageHelper}/> */}
                    <Button className="edit_button" color="primary" variant="contained" type="submit">Post</Button>
                </form>
            </div>
            <div>
            {imgSrc && (
                <img
                src={imgSrc}
                />
            )}
            </div>

        </div>
    )
}

export default WebcamComponent
