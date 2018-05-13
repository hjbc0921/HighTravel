import { initialState } from './selectors'

const schedules_reducer = (state = initialState, action) => {
    console.log('schedules_reducer')
    console.log(state)
    console.log(action)
    console.log(action.type)
    switch (action.type) {
        case 'STORE_SCHEDULE': 
            return Object.assign({}, state, {
                schedules: action.tripSchedules
            })

        default:
            return state
    }
}

export default schedules_reducer
