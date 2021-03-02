import { ResultCodeForCaptcha } from './../api/api';
import { ThunkAction } from "redux-thunk";
import { authAPI } from "../api/authAPI";
import { ResultCodesEnum } from "../api/api";
import { securityAPI } from "../api/securityAPI";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./reduxStore";


//фиксируем передаваемые значения
let initialState = {
    userId: null as (null | number),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'GET_CAPTCHA_URL_SUCCESS':
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}


// ACTION CREATERS
export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
        ({ type: 'SET_USER_DATA', payload: { userId, email, login, isAuth } } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({ type: 'GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl } } as const)
}

// THUNK CREATERS
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === ResultCodesEnum.Success) {
        let { id, login, email } = response.data.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let responce = await authAPI.login(email, password, rememberMe, captcha)
    if (responce.data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (responce.data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    let responce = await authAPI.logout()
    if (responce.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const responce = await securityAPI.getCaptchaUrl()
    const captchaUrl = responce.data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

//Types:
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>



export default authReducer;