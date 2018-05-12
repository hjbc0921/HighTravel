import { initialState } from './selectors'

const adduser_reducer = (state = initialState, action) => {
    console.log('adduser_reducer')
    console.log(state)
    console.log(action)
    console.log(action.type)
    switch (action.type) {
        case 'STORE_USERS': 
            return Object.assign({}, state, {
                adduser: action.names
            })

        default:
            return state
    }
}

export default adduser_reducer
