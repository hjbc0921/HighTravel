import { connect } from 'react-redux'
import {AddUser} from "../components/molecules/AddUser";
import {adduserRequest} from "../store/adduser/actions";

const mapStateToProps = (state) => {
   return {
     addUser: state.adduser,
   }
};

const mapDispatchToProps = (dispatch) => {
    return{
       onAddUser: (username) => {
         dispatch(adduserRequest(username))      
       }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser)

