import { authAPI } from "../api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    users: [],
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })

export const getAuthUserData = () => {
    return async (dispatch) => {
        let responce = await authAPI.me()
        if (responce.data.resultCode === 0) {
            let { userId, email, login } = responce.data.data
            dispatch(setAuthUserData(userId, email, login, true))
        }
    }
}
export const login = (email, password, rememberMe) => {
    return async (dispatch) => {
        let responce = await authAPI.login(email, password, rememberMe)
        if (responce.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            let message = responce.data.message.length > 0 ? responce.data.message[0] : 'Some error'
            dispatch(getAuthUserData({ _error: message }))
        }
    }
}
export const logout = () => {
    return async (dispatch) => {
        let responce = await authAPI.logout()
        if (responce.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}




export default authReducer;