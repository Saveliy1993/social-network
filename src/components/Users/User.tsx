import styles from './Users.module.css'
import React from 'react'
import userPhoto from '../../assets/images/user.jpg'
import { NavLink } from 'react-router-dom'
import { UserType } from '../../types/types'

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}
const User: React.FC<PropsType> = ({ user, followingInProgress, follow, unfollow }) => {
    return (
        <div>
            <div >
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => { unfollow(user.id) }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => { follow(user.id) }}>Follow</button>}
                </div>
                <div>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img className={styles.avatar} src={user.photos.small != null ? user.photos.small : userPhoto} />
                        </NavLink>
                    </div>
                    <div>
                        {user.status}
                    </div>
                </div>
                <div>
                    <div>
                        {user.name}
                    </div>
                    <div>
                        {"user.location.country"}
                        {"user.location.city"}
                    </div>
                </div>
            </div>
        </div >
    )
}


export default User