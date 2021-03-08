import React from 'react'
import { Formik, Field, Form } from 'formik';
import DialogItem from './DialogItem/DialogItem'
import s from './Dialogs.module.css'
import Message from './Message/Message'
import { actions, InitialStateType } from '../../redux/DialogsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/reduxStore';
import { withAuthRedirect } from '../hoc/withAuthRedirect';


const MessagesForm = () => {
    const dispatch = useDispatch()
    const submit = (values: FormValues, { resetForm, setSubmitting }: any) => {
        setSubmitting(true)
        if (values.messageText.length !== 0) {
            dispatch(actions.addMessage(values.messageText))
        }
        resetForm()
        setSubmitting(false)
    }
    return (
        <Formik
            initialValues={{ messageText: '' }}
            onSubmit={submit}
        >
            <Form>
                <Field
                    type={"text"}
                    name='messageText'
                    placeholder='Enter new message'>
                </Field>
                <button type={'submit'}> Send  </button>
            </Form>
        </Formik>
    )
}

const Dialogs: React.FC<PropsType> = (props) => {
    const dialogsPage = useSelector((state: AppStateType) => state.dialogsPage)
    let dialogElement = dialogsPage.dialogs.map(d => <DialogItem id={d.id} name={d.name} />)
    let messageElement = dialogsPage.messages.map(m => <Message message={m.message} />)
    return (
        <div className={s.dialog}>
            <div className={s.users}>
                {dialogElement}
            </div>
            <div className={s.texts}>
                {messageElement}
                <div>
                    <MessagesForm />
                </div>
            </div>
        </div>
    )
}

export default withAuthRedirect(Dialogs);

type PropsType = {
}
type FormValues = {
    messageText: string
}
