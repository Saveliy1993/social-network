import { AppStateType, BaseThunkType, InferActionsTypes } from './reduxStore';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getAuthUserData } from "./AuthReducer";
import { type } from 'os';


//фиксируем передаваемые значения
let initialState = {
    initialized: false,
}
const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
}
//создаём свой новый тип(НЕ СТРИНГ!), что бы не опечататься в буквах
export const actions = {
    initializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' } as const)
}

export const initializeApp = (): ThunkType => async (dispatch) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess())
        })
}

//types:
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>



export default appReducer;