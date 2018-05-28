import { connect } from 'react-redux'
import {Budget} from '../components/molecules/Budget'
import {changeBudgetContent,deleteBudgetRows} from '../store/budget/actions'

const mapStateToProps = (state) => {
  return {
    budget: JSON.parse(sessionStorage.getItem('tripBudgets')),
    updated : state.budget.updated
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    changeContent: (idUpdatedRow) => {
      dispatch(changeBudgetContent(idUpdatedRow))
    },
    onDelete : (budIDs) => {
      dispatch(deleteBudgetRows(budIDs))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Budget)
