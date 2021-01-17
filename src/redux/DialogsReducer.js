const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

let initialState = {
    messages: [
        { id: 1, message: 'Blabla' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Hello I am fine' }
    ],
    newPostMessage: '',
    dialogs: [
        { id: 1, name: 'Roma' },
        { id: 2, name: 'Makar' },
        { id: 3, name: 'Gosha' },
        { id: 4, name: 'Anna' }
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage =  state.newPostMessage
            return {
                ...state,
                newPostMessage: '',
                messages: [...state.messages, {id:4, message:newMessage}],
            }
        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state, 
                newPostMessage : action.newText
            }
        default:
            return state
    }
}

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE })
export const updateNewMessageTextActionCreator = (text) => ({ type: UPDATE_NEW_MESSAGE_TEXT, newText: text })

export default dialogsReducer;