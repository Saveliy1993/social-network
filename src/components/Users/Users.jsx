import React from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User'


const Users = ({ totalItemsCount, pageSize, currentPage, onPageChanged,portionSize, users, ...props }) => {
    return (
        <div>
            <Paginator portionSize={portionSize} totalItemsCount={totalItemsCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />
            <div>
                {users.map(u => <User key={u.id} user={u} followingInProgress={props.followingInProgress} unfollow={props.unfollow}
                    follow={props.follow} />)}
            </div>
        </div >
    )
}


export default Users