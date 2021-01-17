import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            {/*<img src='https://www.planetware.com/photos-large/VIE/vietnam-danang-beach.jpg'></img>*/}
            <div className={s.content}>
                <div>
                    <ProfileStatus updateStatus={props.updateStatus} status={props.status}/>
                </div>
                <div className={s.item}>
                    <img src={props.profile.photos.large} />
                </div>
                <h4>
                    {props.profile.fullName}
                </h4>
                <div className={s.item}>
                    About me: {props.profile.aboutMe}
                </div>
                <div>
                    {props.profile.lookingForAJob}
                </div>
                    Work: {props.profile.lookingForAJobDescription}
                <div>
                </div>
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
    )
}
export default ProfileInfo;