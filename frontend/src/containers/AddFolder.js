import { connect } from 'react-redux'
import { AddFolder } from '../components/molecules/AddFolder'
import { addfolderRequest } from '../store/addphoto/actions'

const mapStateToProps = (state) => {
    return {
       statefunction: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddFolder: (name, date) => {
            dispatch(addfolderRequest(name, date))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFolder)
