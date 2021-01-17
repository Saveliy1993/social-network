import React from 'react'
import { Formik, Field, Form } from 'formik';
import DialogItem from './DialogItem/DialogItem'
import s from './Dialogs.module.css'
import Message from './Message/Message'

const AddMessageForm = (props) => {
    return (
        <Formik>
            <Field type='textarea' onChange={props.onChangeMessage} value={props.newPostMessage} className={s.textarea} placeholder='Enter your message' />
        </Formik>
    )
}

const Dialogs = (props) => {
    let dialogElement = props.dialogs.map(d => <DialogItem id={d.id} name={d.name} />)
    let messageElement = props.messages.map(m => <Message message={m.message} />)

    let onAddMessage = () => {
        props.addMessage()
    }
    let onChangeMessage = (event) => {
        let text = event.target.value
        props.changeMessage(text)
    }
    return (
        <div className={s.dialog}>
            <div className={s.users}>
                {dialogElement}
            </div>
            <div className={s.texts}>
                {messageElement}
                <div>
                    <AddMessageForm onChangeMessage={onChangeMessage} newPostMessage={props.newPostMessage} />
                    <button onClick={onAddMessage}>send</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;