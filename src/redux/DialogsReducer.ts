import { InferActionsTypes } from "./reduxStore";


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
const dialogsReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            let newMessage = state.newPostMessage
            return {
                ...state,
                newPostMessage: '',
                messages: [...state.messages, { id: 4, message: newMessage }],
            }
        case 'UPDATE_NEW_MESSAGE_TEXT':
            return {
                ...state,
                newPostMessage: action.newText
            }
        default:
            return state
    }
}

//actioncreators 
export const actions = {
    addMessageActionCreator: () => ({ type: 'ADD_MESSAGE' } as const),
    updateNewMessageTextActionCreator: (text: string) => ({ type: 'UPDATE_NEW_MESSAGE_TEXT', newText: text } as const)
}


//types:
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>


export default dialogsReducer;