import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks'
import userPhoto from '../../../assets/images/user.jpg'
import { ChangeEvent, useState } from 'react';
import ProfileDataForm from './ProfileData/ProfileDataForm';
import ProfileData from './ProfileData/ProfileData'
import { ProfileType } from '../../../types/types';

type PropsType = {
    savePhoto: (file: File) => void
    isOwner: boolean
    profile: ProfileType | null
    updateStatus: (status: string) => void
    status: string 
    saveProfile: (profile: ProfileType) => void
}

const ProfileInfo: React.FC<PropsType> = ({ profile, savePhoto, updateStatus, status, isOwner, saveProfile }) => {
    let [editMode, setEditMode] = useState(false)
    if (!profile) {
        return <Preloader />
    }
    const onMainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            savePhoto(event.target.files[0])
        }
    }
    return (
        <div>
            {/*<img src='https://www.planetware.com/photos-large/VIE/vietnam-danang-beach.jpg'></img>*/}
            <div className={s.content}>
                <div>
                    <ProfileStatusWithHooks updateStatus={updateStatus} status={status} />
                </div>
                <div className={s.item}>
                    <img src={profile.photos.large != null ? profile.photos.large : userPhoto} />
                    {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
                </div>
                {editMode
                    ? <ProfileDataForm saveProfile={saveProfile} profile={profile} setEditMode={setEditMode} />
                    : <ProfileData isOwner={isOwner} profile={profile} goEditMode={() => setEditMode(true)} />}
            </div>
        </div>
    )
}

export default ProfileInfo;
