import s from './ProfileData.module.css'

const ProfileData = (props) => {
    return <div>
        {props.isOwner && <button onClick={props.goEditMode}>edit</button>}
        <h4>
            {props.profile.fullName}
        </h4>
        <div className={s.item}>
            About me: {props.profile.aboutMe}
        </div>
        <div className={s.item}>
            Looking for a job: {props.profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {props.profile.lookingForAJob &&
            <div className={s.item}>
                My professional skills: {props.profile.lookingForAJobDescription}
            </div>}
        <div className={s.item}>
            Contacts: {Object.keys(props.profile.contacts).map(key => {
            return <Contact key={key} contactTitile={key} contactValue={props.profile.contacts[key]} />
        })}
        </div>
        <div className={s.item}>

        </div>
    </div>
}
const Contact = ({ contactTitile, contactValue }) => {
    return <div className={s.contact}>{contactTitile} : {contactValue}</div>
}

export default ProfileData