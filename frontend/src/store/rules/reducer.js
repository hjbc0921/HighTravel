import { initialState } from './selectors'

const rules_reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_RULE': 
            sessionStorage.setItem('rules', JSON.stringify(action.rules))
            return Object.assign({}, state, {
                rules: action.rules
            })

        default:
            return state
    }
}

export default rules_reducer
