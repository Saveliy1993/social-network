import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'

//фиксируем передаваемые значения
export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}
let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
}

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case GET_CAPTCHA_URL_SUCCESS:
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

//создаём свой новый тип(НЕ СТРИНГ!), что бы не опечататься в буквах и фиксируем остальные значения
type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}
// ACTION CREATERS
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType =>
    ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } })


// THUNK CREATERS
export const getAuthUserData = () => async (dispatch: any) => {
    let response = await authAPI.me();

    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let responce = await authAPI.login(email, password, rememberMe, captcha)
    if (responce.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (responce.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
    }
}
export const logout = () => {
    return async (dispatch: any) => {
        let responce = await authAPI.logout()
        if (responce.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}
export const getCaptchaUrl = () => async (dispatch: any) => {
    const responce = await securityAPI.getCaptchaUrl()
    const captchaUrl = responce.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}





export default authReducer;