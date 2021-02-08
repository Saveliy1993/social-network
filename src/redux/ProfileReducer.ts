import { ProfileType, PhotosType } from './../types/types';
import { profileAPI } from "../api/api";

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

//фиксируем передаваемые значения
export type InitialStateType = typeof initialState
let initialState = {
    posts: [
        { id: 1, message: 'How are u?', likesCount: 15 },
        { id: 2, message: 'lorem', likesCount: 25 },
        { id: 3, message: 'How da u?', likesCount: 5 },
        { id: 4, message: 'Hoe u?', likesCount: 1 },
        { id: 5, message: 'I love React', likesCount: 111 }
    ] as Array<{ id: number, message: string, likesCount: number }>,
    newPostText: '' as string,
    profile: null as ProfileType | null,
    status: '' as string | null,
}

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 6,
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost]
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        default:
            return state
    }
}

//ActionCreators:
type AddPostActionCreatorActionType = { type: typeof ADD_POST }
export const addPostActionCreator = (): AddPostActionCreatorActionType => ({ type: ADD_POST })
type UpdateNewPostTextActionCreatorActionType = { type: typeof UPDATE_NEW_POST_TEXT, newText: string }
export const updateNewPostTextActionCreator = (text: string): UpdateNewPostTextActionCreatorActionType => ({ type: UPDATE_NEW_POST_TEXT, newText: text })
type SetUserProfileActionType = { type: typeof SET_USER_PROFILE, profile: ProfileType }
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile })
type SetStatusActionType = { type: typeof SET_STATUS, status: string }
export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status })
type SavePhotoSuccessActionType = { type: typeof SAVE_PHOTO_SUCCESS, photos: PhotosType }
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos })


//ThunkCreators:
export const getUserProfile = (userId: number) => async (dispatch: any) => {
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}
export const getStatus = (userId: number) => async (dispatch: any) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data))
}
export const updateStatus = (status: string) => async (dispatch: any) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const savePhoto = (file: any) => async (dispatch: any) => {
    const response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile);
    debugger
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    }
}





export default profileReducer;