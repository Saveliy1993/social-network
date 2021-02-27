import { AppStateType } from './reduxStore';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getAuthUserData } from "./AuthReducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
//фиксируем передаваемые значения
export type InitialStateType = {
    initialized: boolean
}
let initialState: InitialStateType = {
    initialized: false,
}
const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
}
//создаём свой новый тип(НЕ СТРИНГ!), что бы не опечататься в буквах
type InitializedSuccessActionType = { type: typeof INITIALIZED_SUCCESS }
export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, InitializedSuccessActionType>
export const initializeApp = (): ThunkType => async (dispatch) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}




export default appReducer;