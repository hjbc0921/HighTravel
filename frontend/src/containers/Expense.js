import { connect } from 'react-redux'
import {Expense} from "../components/molecules/Expense";
import {changeContents,toggleCollapsed} from "../store/antd/actions";//modify code!

const mapStateToProps = (state) => {
  var expenses = sessionStorage.getItem('tripExpenses')
  var totalExpense = sessionStorage.getItem('totalExpenses')
  return {
    expense: JSON.parse(expenses),
    totalExpense: JSON.parse(totalExpense)
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
