import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {createComment} from '../../services/comments'
import {addComment} from '../../redux/actions/comments'
import {Button, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    button: {
        fontWeight: 'bold'
    }
})

const CommentForm = ({postId}) => {
    const currentUser = useSelector(state => state.users.user)
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState('')
    const dispatch = useDispatch()

    const classes = useStyles()

    const updateMessage = (e) => {
        setMessage(e.target.value)
    }

    // Handles the submission of the form
    const handleSubmit = async (e) => {
        e.preventDefault()
        const comment = await createComment(message, postId, currentUser.id)
        if (!comment.errors) {
            // Changes the comment slice of state to update the parent component to make a new requst to find the comment
            dispatch(addComment(comment))
            setMessage('')
        }
    }

    return (
        <div className="comment_form_container">
            <form className="comment_form" onSubmit={handleSubmit}>
                <TextField InputProps={{ disableUnderline: true }} className="comment_form_input" onChange={updateMessage} name="comment" value={message} placeholder="Add a comment..."></TextField>
                <div className="comment_form_button_container">
                    <Button className={classes.button} type='submit' color="primary">Post</Button>
                </div>
            </form>
        </div>
    )
}

export default CommentForm
