import { connect } from 'react-redux'
import Expense from '../components/molecules/Expense'
import {changeExpenseContent,deleteExpenseRows} from '../store/expense/actions'

const mapStateToProps = (state) => {
  var expense = sessionStorage.getItem('tripExpenses')
  var totalExpense = sessionStorage.getItem('totalExpenses')
  if (expense == null || expense == 'undefined')
    expense = []
  else
    expense = JSON.parse(expense)
  if (totalExpense == null || totalExpense == 'undefined')
    totalExpense = []
  else{
    totalExpense = JSON.parse(totalExpense)
  }
  return {
    expense: expense,
    totalExpense: totalExpense,
    updated : state.expense.updated2
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    changeContent: (idUpdatedRow) => {
      dispatch(changeExpenseContent(idUpdatedRow))
    },
    onDelete : (expIDs) => {
      dispatch(deleteExpenseRows(expIDs))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Expense)
