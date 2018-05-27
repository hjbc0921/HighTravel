import { connect } from 'react-redux'
import {Expense} from "../components/molecules/Expense";
import {changeContent,deleteRows} from "../store/expense/actions";//modify code!

const mapStateToProps = (state) => {
  return {
    expense: JSON.parse(sessionStorage.getItem('tripExpenses')),
    totalExpense: JSON.parse(sessionStorage.getItem('totalExpenses')),
    updated : state.expense.updated
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

export default connect(mapStateToProps, mapDispatchToProps)(Expense)
