import React from 'react'
//import {GoogleApiWrapper} from '../../../containers/GoogleMap'
import GoogleApiWrapper from '../../molecules/GoogleMap'
import Markers from '../../molecules/Markers'
//import {MarkerList} from '../../molecules/MarkerList'

const Map = () => {
  return (
    <div className="vs">
    <div className = "mapvs">
        <GoogleApiWrapper/>
    </div>
    <div className = "markervs">
        <Markers/>
    </div>
    </div>
  )
}

export default Map
