import React from 'react'
import AddSchedule from "../../../containers/AddSchedule";
import AddTodo from "../../../containers/AddTodo";
import TodoList from "../../../containers/TodoList";
import ShowSchedule from "../../../components/molecules/Calendar";

const HomePage = () => {
  return (
    <div>
    <ShowSchedule/> 
    <br/><br/>
    <AddSchedule/>
    </div>
  )
}

export default HomePage
