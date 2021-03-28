import usersReducer, { actions, InitialStateType } from './UsersReducer';

let state: InitialStateType
beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: 'Sava1',
                followed: false,
                photos: { small: null, large: null },
                status: 'status'
            },
            {
                id: 1,
                name: 'Sava2',
                followed: false,
                photos: { small: null, large: null },
                status: 'status'
            },
            {
                id: 2,
                name: 'Sava3',
                followed: true,
                photos: { small: null, large: null },
                status: 'status'
            },
            {
                id: 3,
                name: 'Sava4',
                followed: true,
                photos: { small: null, large: null },
                status: 'status'
            },
        ],
        pageSize: 20,
        totalItemsCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
    }
})

test('follow success', () => {
    const newState = usersReducer(state, actions.followSuccess(1))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(3))
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})