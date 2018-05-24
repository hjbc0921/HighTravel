import { initialState } from './selectors'

const adduser_reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_USERS': 
            sessionStorage.setItem('users', action.users)
            sessionStorage.setItem('adduser_msg', action.msg)
            sessionStorage.setItem('adduser_err', action.err)
            return Object.assign({}, state, {
                users: action.users,
                msg: action.msg,
                err: action.err
            })

        default:
            return state
    }
}

export default adduser_reducer
