import { connect } from 'react-redux'
import {Expense} from '../components/molecules/Expense'
import {changeExpenseContent,deleteExpenseRows} from '../store/expense/actions'

const mapStateToProps = (state) => {
  return {
    expense: JSON.parse(sessionStorage.getItem('tripExpenses')),
    totalExpense: JSON.parse(sessionStorage.getItem('totalExpenses')),
    updated : state.expense.updated
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    changeContent: (idUpdatedRow) => {
      dispatch(changeExpenseContent(idUpdatedRow))
    },
    onDelete : (budIDs) => {
      dispatch(deleteExpenseRows(budIDs))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Expense)
