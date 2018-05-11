import { initialState } from "./selectors"

const user_reducer = (state = initialState, action) => {
    console.log('reducer')
    console.log(state)
    console.log(action)
    console.log(action.ownTrip)
   switch (action.type) {
        case 'STORE_TRIP':
			return Object.assign({}, state, {
                user: action.ownTrip
            })
        default:
            return state
    }
}

export default user_reducer
