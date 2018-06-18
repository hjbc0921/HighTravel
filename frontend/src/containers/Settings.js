import { connect } from 'react-redux'
import Settings from "../components/molecules/Settings";
import { adduserRequest, tripPatchRequest, deleteUserRequest } from "../store/settings/actions";
import { deleteExpenseRows } from "../store/expense/actions";
import { deleteUserDiaries } from "../store/diaries/actions";

const mapStateToProps = (state) => {
   var otherUsers = JSON.parse(sessionStorage.getItem('users'))
   var msg = state.settings.msg
   return {
     tripInfo: JSON.parse(sessionStorage.getItem('tripInfo')),
     users: JSON.parse(sessionStorage.getItem('users')),
     updated: state.settings.updated,
     msg: msg,
     err: state.settings.err,
     pop: state.settings.pop
   }
};

const mapDispatchToProps = (dispatch) => {
    return{
       onAddUser: (username) => {
         dispatch(adduserRequest(username))      
       },
       onPatch: (key, value) => {
         dispatch(tripPatchRequest(key, value))      
       },
       deleteUser: (ids, expIds, delUId) => {
         dispatch(deleteUserRequest(ids))
         dispatch(deleteExpenseRows(expIds))
         dispatch(deleteUserDiaries(delUId))
       }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
