import { initialState } from './selectors'

const adduser_reducer = (state = initialState, action) => {
    console.log('adduser_reducer')
    console.log(state)
    console.log(action)
    console.log(action.type)
    switch (action.type) {
        case 'STORE_USERS': 
            return Object.assign({}, state, {
                adduser: action.err ? action.users : action.names,
                msg: action.msg,
                err: action.err
            })

        default:
            return state
    }
}

export default adduser_reducer
