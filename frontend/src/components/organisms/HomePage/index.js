import React from 'react'
import AddSchedule from "../../../containers/AddSchedule";
import AddTodo from "../../../containers/AddTodo";
import TodoList from "../../../containers/TodoList";
import Calendar from "../../../containers/Calendar";

const HomePage = () => {
  return (
    <div>
    <Calendar/> 
    <br/><br/>
    <AddSchedule/>
    </div>
  )
}

export default HomePage
