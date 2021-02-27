import { connect } from 'react-redux'
import { follow, unfollow, requestUsers } from "../../redux/UsersReducer"
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/UsersSelectors'
import Users from './Users'
import React from 'react'
import Preloader from '../common/Preloader/Preloader'
import { compose } from 'redux'
import { UserType } from '../../types/types'
import { AppStateType } from '../../redux/reduxStore'

type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalItemsCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}
type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
}
type OwnProps = {}
type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }
    onPageChanged = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize)
    }
    render() {
        return (
            <div>
                {this.props.isFetching ? <Preloader /> : null}
                <Users
                    totalItemsCount={this.props.totalItemsCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    followingInProgress={this.props.followingInProgress}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(
        mapStateToProps,
        { follow, unfollow, requestUsers }),
)(UsersContainer)


