import { connect } from 'react-redux'
import GoogleApiWrapper from "../components/molecules/GoogleMap";
import { addMarker } from "../store/addmarker/actions";

const mapStateToProps = (state) => {
  const markers = [{
    key: 0,
    id: 1,
    contents: 'Dotonbori',
    }, {
    key: 1,
    id: 2,
    contents: 'Osaka castle',
  }]
  return{
    marker : markers
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
