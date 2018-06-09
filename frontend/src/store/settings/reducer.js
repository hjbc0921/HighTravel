import { initialState } from './selectors'

const settings_reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_USERS': 
            sessionStorage.setItem('users', action.users)
            sessionStorage.setItem('adduser_msg', action.msg)
            sessionStorage.setItem('adduser_err', action.err)
            console.log('store users reducer')
            return Object.assign({}, state, {
                users: action.users,
                msg: action.msg,
                err: action.err,
                updated: true
            })

        default:
            return state
    }
}

export default settings_reducer
