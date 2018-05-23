import { connect } from 'react-redux'
import {Expense} from "../components/molecules/Expense";
import {changeContents,toggleCollapsed} from "../store/antd/actions";//modify code!

const mapStateToProps = (state) => {
  return {
    antd: state.antd,
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

export default connect(mapStateToProps, mapDispatchToProps)(Expense)