import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './Myposts/MyPosts';
import stylesProfile from './Profile.module.css'

const Profile = (props) => {
    return (
        <div className={stylesProfile.profileBlock}>
            <ProfileInfo {...props}savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile} updateStatus={props.updateStatus} status={props.status}/>
            <MyPosts />
        </div>
    )
}
export default Profile;
