import { connect } from 'react-redux'
import {Budget} from "../components/molecules/Budget";
import {changeContents,toggleCollapsed} from "../store/antd/actions";//modify code!

const mapStateToProps = (state) => {
  var budgets = sessionStorage.getItem('tripBudgets')
  return {
    budget: JSON.parse(budgets)
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

export default connect(mapStateToProps, mapDispatchToProps)(Budget)
