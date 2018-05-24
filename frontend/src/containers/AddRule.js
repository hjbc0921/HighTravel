import { connect } from 'react-redux'
import { AddRule } from '../components/molecules/AddRule'
import { postRuleRequest } from '../store/rules/actions'

const mapStateToProps = (state) => {
    return {
       statefunction: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPostRule: (input) => {
            dispatch(postRuleRequest(input))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRule)
