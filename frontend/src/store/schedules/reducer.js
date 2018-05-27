import { initialState } from './selectors'

const schedules_reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'STORE_SCHEDULE': 
            sessionStorage.setItem('schedules', JSON.stringify(action.schedules))
            return Object.assign({}, state, {
                schedules: action.schedules
            })

        default:
            return state
    }
}

export default schedules_reducer
