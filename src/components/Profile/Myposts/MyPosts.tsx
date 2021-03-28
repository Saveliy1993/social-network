import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../redux/ProfileReducer';
import { AppStateType } from '../../../redux/reduxStore';
import { PostType } from '../../../types/types';
import { Button, TextField } from '@material-ui/core';

type PropsType = {}
type FormValues = {
    postText: string
}


const PostsForm: React.FC<PropsType> = (props) => {
    const dispatch = useDispatch()
    const validationSchema = yup.object({
        postText: yup.string().required('Post is required').max(100)
    })
    return (
        <Formik
            initialValues={{ postText: '', }}
            validateOnBlur
            validationSchema={validationSchema}
            onSubmit={(
                values: FormValues,
                { setSubmitting, resetForm }: any
            ) => {
                setSubmitting(true)
                dispatch(actions.addPost(values.postText))
                resetForm()
            }}>
            <Form>
                <TextField label='New Post:'name='postText' type='textarea' className={s.window} placeholder='Whats new?' />
                <div className={s.button}>
                    <Button variant="contained" type='submit'>Send</Button>
                </div>
            </Form>
        </Formik>
    )
}

const MyPosts: React.FC<PropsType> = () => {
    const posts = useSelector((state: AppStateType) => state.profilePage.posts)
    let postElements = posts.map((item: PostType) => (
        <Post key={item.id} text={item.text} likesCount={item.likesCount} />
    ))
    return (
        <div className={s.content}>
            <h4>
                All posts:
            </h4>
            <div>
                <PostsForm />
            </div>
            {postElements}
        </div>
    )
}
export default MyPosts;