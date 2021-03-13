import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './Myposts/MyPosts';
import stylesProfile from './Profile.module.css'
import { ProfileType } from '../../types/types';

type PropsType = {
    savePhoto: (file: File) => void
    isOwner: boolean
    profile: ProfileType | null
    updateStatus: (status: string) => void
    status: string 
    saveProfile: (profile: ProfileType) => void
}

const Profile: React.FC<PropsType> = ({ savePhoto, isOwner, profile, updateStatus, status, saveProfile }) => {
    return (
        <div className={stylesProfile.profileBlock}>
            <ProfileInfo savePhoto={savePhoto} isOwner={isOwner} profile={profile} updateStatus={updateStatus} status={status} saveProfile={saveProfile} />
            <MyPosts />
        </div>
    )
}
export default Profile;
