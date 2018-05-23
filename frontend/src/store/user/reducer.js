import { initialState } from "./selectors"

const user_reducer = (state = initialState, action) => {
   switch (action.type) {
        case 'STORE_TRIP':
            sessionStorage.setItem('mytrips',JSON.stringify(action.mytrips))
			return Object.assign({}, state, {
                trips : action.mytrips,
            })
        case 'STORE_TRIP_ID':
            sessionStorage.setItem('tripID',action.tripID)
            sessionStorage.setItem('triptitle',action.tripTitle)
			return Object.assign({}, state, {
                tripID: action.tripID,
                tripTitle: action.tripTitle
            })
        default:
            return state
    }
}

export default user_reducer
