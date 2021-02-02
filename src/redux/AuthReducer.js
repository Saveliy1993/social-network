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

// ACTION CREATERS
export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })

// THUNK CREATERS
export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me();

    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}
export const login = (email, password, rememberMe) => async (dispatch) => {
    let responce = await authAPI.login(email, password, rememberMe)
    if (responce.data.resultCode === 0) {
        dispatch(getAuthUserData())
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