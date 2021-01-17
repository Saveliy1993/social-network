let store = {
    _callSubscriber() {
        console.log('_State changed')
    },
    _state: {
        dialogsPage: {
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
        },
        profilePage: {
            posts: [
                { id: 1, message: 'How are u?', likesCount: 15 },
                { id: 2, message: 'lorem', likesCount: 25 },
                { id: 3, message: 'How da u?', likesCount: 5 },
                { id: 4, message: 'Hoe u?', likesCount: 1 },
                { id: 5, message: 'I love React', likesCount: 111 }
            ],
            newPostText: ''
        },
        sidebar: {
            friends: [
                { id: 1, name: 'Anna' },
                { id: 2, name: 'Gosha' },
                { id: 3, name: 'Makar' },
            ]
        }
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {
        this._state.profilePage=profileReducer(this._state.profilePage, action)
        this._state.dialogsPage=dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber(this._state)
    }
}


