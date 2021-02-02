import { profileAPI } from "../api/api";

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'


let initialState = {
    posts: [
        { id: 1, message: 'How are u?', likesCount: 15 },
        { id: 2, message: 'lorem', likesCount: 25 },
        { id: 3, message: 'How da u?', likesCount: 5 },
        { id: 4, message: 'Hoe u?', likesCount: 1 },
        { id: 5, message: 'I love React', likesCount: 111 }
    ],
    newPostText: '',
    profile: null,
    status: '',
}

const profileReducer = (state = initialState, action) => {
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
                profile: { ...state.profile, photos: action.photos }
            }
        default:
            return state
    }
}

//ActionCreators:
export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos })


//ThunkCreators:
export const getUserProfile = (userId) => async (dispatch) => {
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}
export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then(data => {
            dispatch(setStatus(data))
        })
    }
}
export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status).then(data => {
            if (data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
    }
}
export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}
export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile);
    debugger
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    }
}





export default profileReducer;