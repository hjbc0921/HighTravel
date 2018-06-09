import { connect } from 'react-redux'
import { RuleList } from '../components/molecules/RuleList'
import { deleteRuleRequest, postRuleRequest } from '../store/rules/actions'

const mapStateToProps = (state) => {
    var rules = sessionStorage.getItem('rules')

    return {
        rules: JSON.parse(rules)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPostRule: (input) => {
            dispatch(postRuleRequest(input))
        },
        onDeleteRule: (ruleId) => {
            dispatch(deleteRuleRequest(ruleId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RuleList)
