import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks'
import userPhoto from '../../../assets/images/user.jpg'
import { useState } from 'react';
import ProfileDataForm from './ProfileData/ProfileDataForm';
import ProfileData from './ProfileData/ProfileData'

const ProfileInfo = (props) => {
    let [editMode, setEditMode] = useState(false)
    if (!props.profile) {
        return <Preloader />
    }
    const onMainPhotoSelected = (event) => {
        if (event.target.files.length) {
            props.savePhoto(event.target.files[0])
        }
    }
    return (
        <div>
            {/*<img src='https://www.planetware.com/photos-large/VIE/vietnam-danang-beach.jpg'></img>*/}
            <div className={s.content}>
                <div>
                    <ProfileStatusWithHooks updateStatus={props.updateStatus} status={props.status} />
                </div>
                <div className={s.item}>
                    <img src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto} />
                    {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
                </div>
                {editMode
                    ? <ProfileDataForm {...props}  setEditMode={setEditMode} />
                    : <ProfileData {...props} goEditMode={()=>setEditMode(true)}/>}
            </div>
        </div>
    )
}

export default ProfileInfo;
