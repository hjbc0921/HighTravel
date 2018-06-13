import React from 'react'
//import {GoogleApiWrapper} from '../../../containers/GoogleMap'
import GoogleApiWrapper from '../../molecules/GoogleMap'
import Markers from '../../molecules/Markers'
//import {MarkerList} from '../../molecules/MarkerList'

const Map = () => {
  return (
    <div>
        <GoogleApiWrapper/>
        <div className="vs">
            <Markers/>
        </div>
    </div>
  )
}

export default Map
