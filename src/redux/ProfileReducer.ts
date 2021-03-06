import { AppStateType, BaseThunkType, InferActionsTypes } from './reduxStore';
import { ProfileType, PhotosType, PostType } from './../types/types';
import { profileAPI } from "../api/profileAPI";
import { ThunkAction } from 'redux-thunk';


let initialState = {
    posts: [
        { id: 1, text: 'How are u?', likesCount: 15 },
        { id: 2, text: 'lorem', likesCount: 25 },
        { id: 3, text: 'How da u?', likesCount: 5 },
        { id: 4, text: 'Hoe u?', likesCount: 1 },
        { id: 5, text: 'I love React', likesCount: 111 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '' as string | null,
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST':
            return {
                ...state,
                posts: [...state.posts, { id: 6, text: action.postText, likesCount: 0 }]
            }
        case 'SET_USER_PROFILE': {
            return { ...state, profile: action.profile }
        }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        default:
            return state
    }
}

//ActionCreators:
export const actions = {
    addPost: (postText: string) => ({ type: 'ADD_POST', postText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: 'SAVE_PHOTO_SUCCESS', photos } as const),
}


//ThunkCreators:
export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const response = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(response.data));
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(response.data.data.photos));
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => { // getstate??
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        if (userId !== null) {
            dispatch(getUserProfile(userId));
        } else {
            throw new Error("userId cant be null")
        }
    }
}

//types:
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>




export default profileReducer;