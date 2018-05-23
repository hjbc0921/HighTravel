import { connect } from 'react-redux'
import { AddBudget }  from "../components/molecules/AddBudget";
import { addbudgetRequest } from "../store/budget/actions";

const mapStateToProps = (state) => {
  return{
    budget : state.budget,
 }
};

const mapDispatchToProps = (dispatch) =>{
  return{
   onAddBudget: (contents,money) => {
      dispatch(addbudgetRequest(contents,money))
   }
 }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBudget)
