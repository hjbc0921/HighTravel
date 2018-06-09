import { connect } from 'react-redux'
import Settings from "../components/molecules/Settings";
import { adduserRequest, tripPatchRequest } from "../store/settings/actions";

const mapStateToProps = (state) => {
        console.log('in container', state)
   return {
     tripInfo: JSON.parse(sessionStorage.getItem('tripInfo')),
     users: JSON.parse(sessionStorage.getItem('users')),
     updated: state.settings.updated
   }
};

const mapDispatchToProps = (dispatch) => {
    return{
       onAddUser: (username) => {
         dispatch(adduserRequest(username))      
       },
       onPatch: (key, value) => {
         console.log('********onPatch container', key, value)
         dispatch(tripPatchRequest(key, value))      
       }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
