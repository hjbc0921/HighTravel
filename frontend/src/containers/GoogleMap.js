import { connect } from 'react-redux'
import GoogleApiWrapper from "../components/molecules/GoogleMap";
import { addMarker } from "../store/addmarker/actions";

const mapStateToProps = (state) => {
  const budgets = [{
    key: 0,
    id: 1,
    contents: 'Eiffel Tower',
    }, {
    key: 1,
    id: 2,
    contents: 'Versailles',
  }]
  return{
    marker : budgets
 }
};

const mapDispatchToProps = (dispatch) =>{
  return{
   onAddBudget: (contents,money) => {
      dispatch(addbudgetRequest(contents,money))
   }
 }
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper)
