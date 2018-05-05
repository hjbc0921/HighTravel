let nextRuleId = 0

export const STORE_RULE = 'STORE_RULE'

// action for load rules and stroer them
export const storeRule = (rules) => {
    console.log('action stroeRule')
    return {
        type: STORE_RULE,
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
