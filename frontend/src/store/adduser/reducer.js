import { initialState } from './selectors'

const adduser_reducer = (state = initialState, action) => {
    console.log('adduser_reducer')
    console.log(state)
    console.log(action)
    console.log(action.type)
    switch (action.type) {
        case 'STORE_USERS': 
            return Object.assign({}, state, {
                adduser: {
                    adduser: action.names,
                    msg: state.msg,
                    err: state.err
                }
            })
        case 'STORE_STATUS': 
            return Object.assign({}, state, {
                adduser: {
                    adduser: state.adduser,
                    msg: action.msg,
                    err: action.err
                }
            })

        default:
            return state
    }
}

export default adduser_reducer
