import { Field, Formik, Form } from "formik"

const ProfileDataForm = (props, {setSubmitting}) => {
    const initialValues = {
        aboutMe: props.profile.aboutMe, lookingForAJob: props.profile.lookingForAJob,
        lookingForAJobDescription: props.profile.lookingForAJobDescription, fullName: props.profile.fullName, contacts: props.profile.contacts
    };
    const submit = (values) => {  props.saveProfile(values).then(() => props.setEditMode(false))(setSubmitting(false)) }
    return <Formik
        initialValues={initialValues}
        onSubmit={submit}    >
        <Form>
            <div>
                Full name:
                <Field name='fullName' />
            </div>
            <div>
                About me:
                <Field name='aboutMe' />
            </div>
            <div>
                Looking for a job:
                <Field type='checkbox' name='lookingForAJob' />
            </div>
            <div>
                My professional skills:
                <Field name='lookingForAJobDescription' />
            </div>
            <div>
                Contacts:
                {Object.keys(props.profile.contacts).map(key => {
                return <div key={key}> {key}:  <Field name={`contacts.${key}`} placeholder={`https://${key}.com`} /></div>
            })}
            </div>
            <button type="submit" >Save</button>
            <button onClick={() => props.setEditMode(false)}>Cancel</button>
        </Form>
    </Formik>
}
export default ProfileDataForm
