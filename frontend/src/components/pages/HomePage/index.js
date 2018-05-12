import React from 'react'
import AddUser from "../../../containers/AddUser";
import AddSchedule from "../../../containers/AddSchedule";
import AddTodo from "../../../containers/AddTodo";

const HomePage = () => {
  return (
    <div>
     <AddUser/>
     <AddSchedule/>
     <AddTodo/>
    </div>
  )
}

export default HomePage
