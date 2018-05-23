import { connect } from 'react-redux'
import { AddExpense }  from "../components/molecules/AddExpense";
import { addexpenseRequest } from "../store/expense/actions";

const mapStateToProps = (state) => {
  return{
    expense : state.expense,
 }
};

const mapDispatchToProps = (dispatch) =>{
  return{
   onAddExpense: (contents,date,money) => {
      dispatch(addexpenseRequest(contents,date,money))
   }
 }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense)
