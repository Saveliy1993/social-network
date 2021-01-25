import { applyMiddleware, combineReducers, createStore } from "redux";
import dialogsReducer from "./DialogsReducer";
import profileReducer from "./ProfileReducer";
import sidebarReducer from "./SidebarReducer";
import usersReducer from "./UsersReducer";
import authReducer from "./AuthReducer";
import thunkMiddleware from "redux-thunk";
import appReducer from "./AppReducer";

let reducers=combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
})

let store= createStore(reducers,applyMiddleware(thunkMiddleware));

window.store=store;

export default store;