import React from 'react'
import AddSchedule from "../../../containers/AddSchedule";
import Calendar from "../../../containers/Calendar";
import ScheduleList from "../../../containers/ScheduleList"

const HomePage = () => {
  return (
    <div>
    <Calendar/> 
    <br/><br/>
    <AddSchedule/>
    <br/><br/>
    <ScheduleList/>
    </div>
  )
}

export default HomePage
