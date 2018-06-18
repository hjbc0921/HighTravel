import { connect } from 'react-redux'
import GoogleApiWrapper from "../components/molecules/GoogleMap";
import { addMarker, patchMarker, deleteMarker } from "../store/addmarker/actions";

const mapStateToProps = (state) => {
  let markers 
  let marker = sessionStorage.getItem('tripMarkers')
  if (marker === null || marker==='undefined'){
    markers = []
  }
  else{
    markers = JSON.parse(marker)
  }

  return{
    marker : markers,
    updated : state.addmarker.updated
  }
};

const mapDispatchToProps = (dispatch) =>{
  return{
    onAddMarker: (lat,lng) => {
      dispatch(addMarker(lat,lng))
    },
    onChangeContent : (updatedRow) => {
      dispatch(patchMarker(updatedRow))
    },
    onDelete : (markIDs) => {
      dispatch(deleteMarker(markIDs))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper)
