import { InferActionsTypes } from "./reduxStore";


// our globalstate
let initialState = {
    messages: [
        { id: 1, message: 'Blabla' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Hello I am fine' }
    ] as Array<{ id: number, message: string }>,
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
        case 'SEND_MESSAGE':
            let body = action.messageText
            return {
                ...state,
                messages: [...state.messages, { id: 4, message: body }]
            }
        default:
            return state
    }
}

//actioncreators 
export const actions = {
    addMessage: (messageText: string) => ({ type: 'SEND_MESSAGE', messageText } as const)
}


//types:
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>


export default dialogsReducer;