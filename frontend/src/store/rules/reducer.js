import { initialState } from './selectors'

const rules_reducer = (state = initialState, action) => {
    console.log('reducer')
    console.log(state)
    console.log(action)
    console.log(action.type)
    console.log(action.rules)
    console.log(Array.isArray(action.tripRules))
    switch (action.type) {
        case 'STORE_RULE': 
            return Object.assign({}, state, {
                rules: action.tripRules
            })

        default:
            return state
    }
}

export default rules_reducer
