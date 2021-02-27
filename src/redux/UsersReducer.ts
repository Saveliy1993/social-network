import { AppStateType } from './reduxStore';
import { UserType } from './../types/types';
import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/ObjectHelpers";
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'


export type InitialStateType = typeof initialState
let initialState = {
    users: [] as Array<UserType>,
    pageSize: 20 as number,
    totalItemsCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>, //array off users id
}

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            }
        case SET_USERS:
            return { ...state, users: action.users }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }
        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalItemsCount: action.count }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

type ActionsType = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType | SetCurrentPageActionType | SetTotalUsersCountActionType
    | ToggleIsFetchingActionType | ToggleFollowingProgressActionType

//ActionCreators:
type FollowSuccessActionType = { type: typeof FOLLOW, userId: number }
export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId })

type UnfollowSuccessActionType = { type: typeof UNFOLLOW, userId: number }
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId })

type SetUsersActionType = { type: typeof SET_USERS, users: Array<UserType> }
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users })

type SetCurrentPageActionType = { type: typeof SET_CURRENT_PAGE, currentPage: number }
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage })

type SetTotalUsersCountActionType = { type: typeof SET_TOTAL_USERS_COUNT, count: number }
export const setTotalUsersCount = (totalItemsCount: number): SetTotalUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, count: totalItemsCount })

type ToggleIsFetchingActionType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean }
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })

type ToggleFollowingProgressActionType = { type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, isFetching: boolean, userId: number }
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })


// method for refactoring   _ Для обозначения что это приватная местная санка 
const _followUnfollowFlow = async (dispatch: Dispatch<ActionsType>, userId: number,
    apiMethod: any, actionCreator: (userId: number) => FollowSuccessActionType | UnfollowSuccessActionType) => {
    dispatch(toggleFollowingProgress(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

//thunks:
export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
        dispatch(toggleIsFetching(false))
    }
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    }
}


export default usersReducer;