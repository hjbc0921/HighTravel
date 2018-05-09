import { connect } from 'react-redux'
import { RuleList } from '../components/molecules/RuleList'
import { deleteRuleRequest } from '../store/rules/actions'

const mapStateToProps = (state) => {
    console.log('container')
    console.log(state.rules.rules)
    console.log(state.rules)

    return {
        rules: state.rules.rules
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteRule: (ruleId) => {
            dispatch(deleteRuleRequest(ruleId))
            console.log('in onDeleteRule')
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RuleList)
