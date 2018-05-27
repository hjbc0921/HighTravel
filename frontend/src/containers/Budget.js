import { connect } from 'react-redux'
import {Budget} from "../components/molecules/Budget";
import {changeContent,deleteRows} from "../store/budget/actions";//modify code!

const mapStateToProps = (state) => {
  return {
    budget: JSON.parse(sessionStorage.getItem('tripBudgets')),
    updated : state.budget.updated
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    changeContent: (idUpdatedRow) => {
      dispatch(changeContent(idUpdatedRow))
    },
    onDelete : (budIDs) => {
      dispatch(deleteRows(budIDs))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Budget)
