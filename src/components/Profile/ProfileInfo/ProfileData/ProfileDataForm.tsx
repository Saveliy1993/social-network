import { Button, Checkbox, TextField } from "@material-ui/core";
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
                    <TextField name='fullName'id="outlined-basic" label="Full name:" variant="outlined" size='small'/>                
                </div>
                <div>
                    <TextField name='aboutMe'id="outlined-basic" label="About me:" variant="outlined" size='small'/>                
                </div>
                <div>
                    Looking for a job:
                    <Checkbox color='primary' name='lookingForAJob' />
                </div>
                <div>
                    <TextField name='lookingForAJobDescription'id="outlined-basic" label="My professional skills:" variant="outlined" size='small'/>                
                </div>
                <div>
                    Contacts:
                {Object.keys(profile.contacts).map(key => {
                    return <div key={key}>   
                                <TextField name={`contacts.${key}`}id="outlined-basic" placeholder={`https://${key}.com`} label={key} variant="outlined" size='small'/>        
                            </div>        
                })}
                </div>
                <Button variant="contained" type="submit" >Save</Button>
                <Button variant="contained" color='secondary' onClick={() => setEditMode(false)}>Cancel</Button>
            </Form>
        </Formik>
    )
}
export default ProfileDataForm
