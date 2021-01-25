import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';



const AddPostForm = (props) => {
    const validationSchema = yup.object({
        newPost: yup.string().required('Post is required').max(10)
    })
    return (
        <Formik
            initialValues={{
                newPost: '',
            }}
            validateOnBlur
            validationSchema={validationSchema}
        >
            <Form>
                <Field name='newPost' type='textarea' onChange={props.onPostChange} value={props.newPostText} className={s.window} placeholder='Enter your post' />
            </Form>
        </Formik>
    )
}

const MyPosts = (props) => {
    let postElements = [...props.posts].reverse().map(p => <Post message={p.message} likesCount={p.likesCount} />)

    let onAddPost = () => {
        props.addPost()
    }

    let onPostChange = (event) => {
        let text = event.target.value
        props.updateNewPostText(text)
    }

    return (
        <div className={s.content}>
            <h4>
                New post:
            </h4>
            <div>
                <AddPostForm onPostChange={onPostChange} newPostText={props.newPostText} />
            </div>
            <div className={s.button}>
                <button onClick={onAddPost}>Send</button>
            </div>
            {postElements}
        </div>
    )
}
export default MyPosts;