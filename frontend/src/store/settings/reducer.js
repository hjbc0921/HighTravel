import { initialState } from './selectors'

const settings_reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_TRIP_INFO': 
            return Object.assign({}, state, {
                updated: true
            })
        case 'STORE_USERS': 
            return Object.assign({}, state, {
                updated: true,
                msg: action.msg,
                err: action.err,
                pop: true
            })
        default:
            return Object.assign({}, state, {
                updated: false,
                pop: false
            })
    }
}

export default settings_reducer
