import { connect } from 'react-redux'
import Antd from "../components/organisms/Antd";
import {changeContents,toggleCollapsed} from "../store/antd/actions";//modify code!

const mapStateToProps = (state) => {
  return {
    antd: state.antd,
    menu: sessionStorage.getItem('menu')
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    changeContent: (e) => {
      dispatch(changeContents(e))
    },
    toggleCol : (col) => {
        dispatch(toggleCollapsed(col))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Antd)
