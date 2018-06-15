import React from 'react'
//import AddSchedule from "../../../containers/AddSchedule";
import Calendar from "../../../containers/Calendar";
import ScheduleList from "../../../containers/ScheduleList"

const HomePage = () => {
  return (
    <div className = "garo">
      <div className = "left">
        <Calendar/> 
      </div>
      <div className = "right">
        <ScheduleList/>
      </div>
    </div>
  )
}

export default HomePage
