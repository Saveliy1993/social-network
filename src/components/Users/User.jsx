import styles from './Users.module.css'
import React from 'react'
import userPhoto from '../../assets/images/user.jpg'
import { NavLink } from 'react-router-dom'
import Paginator from '../common/Paginator/Paginator'


const User = ({ totalUsersCount, pageSize, currentPage, onPageChanged, user, ...props }) => {
    return (
        <div>
            <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />
            <div >
                <div>
                    {user.followed
                        ? <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => { props.unfollow(user.id) }}>Unfollow</button>
                        : <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => { props.follow(user.id) }}>Follow</button>}
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