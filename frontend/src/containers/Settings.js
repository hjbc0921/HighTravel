import { connect } from 'react-redux'
import Settings from "../components/molecules/Settings";
import { adduserRequest } from "../store/settings/actions";

const mapStateToProps = (state) => {
   return {
     tripInfo: JSON.parse(sessionStorage.getItem('tripInfo')),
     users: JSON.parse(sessionStorage.getItem('users')),
   }
};

const mapDispatchToProps = (dispatch) => {
    return{
       onAddUser: (username) => {
         dispatch(adduserRequest(username))      
       }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
