import React from 'react'
import { UserType } from '../../types/types'
import Paginator from '../common/Paginator/Paginator'
import User from './User'

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}
const Users: React.FC<PropsType> = ({ totalItemsCount, pageSize, currentPage, onPageChanged, users, ...props }) => {
    return (
        <div>
            <Paginator totalItemsCount={totalItemsCount}
                pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />
            <div>
                {users.map(u => <User key={u.id} user={u} followingInProgress={props.followingInProgress}
                    unfollow={props.unfollow} follow={props.follow} />)}
            </div>
        </div >
    )
}


export default Users