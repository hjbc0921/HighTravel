import { initialState } from './selectors'

const rules_reducer = (state = initialState, action) => {
    console.log('reducer')
    console.log(state)
    console.log(action.type)
    switch (action.type) {
        case 'STORE_RULE': 
            return Object.assign({}, state, {
                rules: action.rules
            })

        default:
            return state
    }
}

export default rules_reducer
