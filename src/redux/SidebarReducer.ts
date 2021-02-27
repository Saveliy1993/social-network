
export type InitialStateType = typeof initialState
type FriendsType = Array<{ id: number, name: string }>
let initialState = {
    friends: [
        { id: 1, name: 'Anna' },
        { id: 2, name: 'Gosha' },
        { id: 3, name: 'Makar' },
    ] as FriendsType
}
const sidebarReducer = (state = initialState, action: any) => {
    return state
}

export default sidebarReducer