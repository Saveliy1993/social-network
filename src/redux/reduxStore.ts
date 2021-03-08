import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux";
import dialogsReducer from "./DialogsReducer";
import profileReducer from "./ProfileReducer";
import sidebarReducer from "./SidebarReducer";
import usersReducer from "./UsersReducer";
import authReducer from "./AuthReducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import appReducer from "./AppReducer";

//комбайнит наши редьюсеры для обращения из компонент
let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
})

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

//@ts-ignore
window.__store__ = store; //даёт возможность запрашивать store через консоль


export default store;

type RootReducerType = typeof rootReducer //(globalstate: AppStateType)=>AppStateType
export type AppStateType = ReturnType<RootReducerType>
//типизация ActionCreators во всех редьюсерах:
export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
//типизация санок
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
