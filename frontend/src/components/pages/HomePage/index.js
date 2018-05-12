import React from 'react'
import AddUser from "../../../containers/AddUser";
import AddSchedule from "../../../containers/AddSchedule";
import AddTodo from "../../../containers/AddTodo";
import Sidebar from "../../../containers/Sidebar";

const HomePage = () => {
  return (
    <div>
     <AddUser/>
     <AddSchedule/>
     <AddTodo/>
     <Sidebar/>
    </div>
  )
}

export default HomePage
