export const STORE_RULE = 'STORE_RULE'

// action for load rules and strore them
export const storeRule = (rules) => {
    console.log('action stroeRule')
    return {
        type: 'STORE_RULE',
        rules: rules
    }
}


export const POST_RULE_REQUEST = 'POST_RULE_REQUEST'

// action for server communication (send POST to server)
export const postRuleRequest = (contents) => {
    console.log('action to postRuleRequest')
    return {
        type: POST_RULE_REQUEST,
        contents
    }
}

export const DELETE_RULE_REQUEST = 'DELETE_RULE_REQUEST'

// action for server communication (send Delete to server)
export const deleteRuleRequest = (ruleId) => {
    console.log('action to deleteRuleRequest')
    return {
        type: DELETE_RULE_REQUEST,
        ruleId
    }
}
