import { connect } from 'react-redux'
import { RuleList } from '../components/molecules/RuleList'

const mapStateToProps = (state) => {
    console.log('container')
    console.log(state.rules.rules)
    console.log(state.rules)

    return {
        rules: state.rules.rules
    }
}

export default connect(mapStateToProps)(RuleList)
