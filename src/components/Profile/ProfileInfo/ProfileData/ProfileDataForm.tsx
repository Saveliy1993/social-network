import { Field, Formik, Form } from "formik"
import { ProfileType } from "../../../../types/types";

//!!!need refactoring!!!!!!!

type PropsType = {
    saveProfile: (profile: ProfileType) => void
    profile: ProfileType
}

const ProfileDataForm: React.FC<any> = ({ setEditMode, saveProfile, profile }) => {
    const initialValues = {
        aboutMe: profile.aboutMe,
        lookingForAJob: profile.lookingForAJob,
        lookingForAJobDescription: profile.lookingForAJobDescription,
        fullName: profile.fullName,
        contacts: profile.contacts
    };
    const submit = (values: any, {setSubmitting}:any) => {
        saveProfile(values).then(() =>
            setEditMode(false))(setSubmitting(false))
    }
    return (
        <Formik
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
                {Object.keys(profile.contacts).map(key => {
                    return <div key={key}> {key}:  <Field name={`contacts.${key}`} placeholder={`https://${key}.com`} /></div>
                })}
                </div>
                <button type="submit" >Save</button>
                <button onClick={() => setEditMode(false)}>Cancel</button>
            </Form>
        </Formik>
    )
}
export default ProfileDataForm
