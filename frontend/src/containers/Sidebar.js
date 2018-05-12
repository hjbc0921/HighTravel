import {connect} from 'react-redux'
import {Sidebar} from "../components/molecules/Sidebar";

const mapStateToProps = (state) => {
   return {
      sidebar: state.sidebar  
   }
};

const mapDispatchToProps = (dispatch) => {
   return {
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
