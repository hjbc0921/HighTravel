import { connect } from 'react-redux'
import {Budget} from "../components/molecules/Budget";
import {changeContents,toggleCollapsed} from "../store/antd/actions";//modify code!

const mapStateToProps = (state) => {
  console.log("##############",state.budget,state.budget.tripBudgets)
  return {
    budget: state.budget.tripBudgets
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
