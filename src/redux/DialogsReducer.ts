import { type } from "os";

const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

//фиксируем передаваемые значения
export type InitialStateType = typeof initialState
// our globalstate
let initialState = {
    messages: [
        { id: 1, message: 'Blabla' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Hello I am fine' }
    ] as Array<{ id: number, message: string }>,
    newPostMessage: '' as string,
    dialogs: [
        { id: 1, name: 'Roma' },
        { id: 2, name: 'Makar' },
        { id: 3, name: 'Gosha' },
        { id: 4, name: 'Anna' }
    ] as Array<{ id: number, name: string }>
}
//reducers для изменений, если хотим менять данные, для начала их нужно скопировать
const dialogsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = state.newPostMessage
            return {
                ...state,
                newPostMessage: '',
                messages: [...state.messages, { id: 4, message: newMessage }],
            }
        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newPostMessage: action.newText
            }
        default:
            return state
    }
}
//создаём свой новый тип(НЕ СТРИНГ!), что бы не опечататься в буквах и фиксируем остальные значения
type AddMessageActionCreatorType = { type: typeof ADD_MESSAGE }
type UpdateNewMessageTextActionCreatorType = { type: typeof UPDATE_NEW_MESSAGE_TEXT, newText: string }
//actioncreators 
export const addMessageActionCreator = (): AddMessageActionCreatorType => ({ type: ADD_MESSAGE })
export const updateNewMessageTextActionCreator = (text: string) => ({ type: UPDATE_NEW_MESSAGE_TEXT, newText: text })

export default dialogsReducer;