import { ContactsType, ProfileType } from '../../../../types/types'
import s from './ProfileData.module.css'

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    goEditMode: () => void
}

const ProfileData: React.FC<PropsType> = ({ goEditMode, isOwner, profile }) => {
    return <div>
        {isOwner && <button onClick={goEditMode}>edit</button>}
        <h4>
            {profile.fullName}
        </h4>
        <div className={s.item}>
            About me: {profile.aboutMe}
        </div>
        <div className={s.item}>
            Looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob &&
            <div className={s.item}>
                My professional skills: {profile.lookingForAJobDescription}
            </div>}
        <div className={s.item}>
            Contacts: {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitile={key} contactValue={profile.contacts[key as keyof ContactsType]} />
        })}
        </div>
        <div className={s.item}>

        </div>
    </div>
}

type ContactType = {
    contactTitile: string
    contactValue: string
}
const Contact: React.FC<ContactType> = ({ contactTitile, contactValue }) => {
    return <div className={s.contact}>{contactTitile} : {contactValue}</div>
}

export default ProfileData