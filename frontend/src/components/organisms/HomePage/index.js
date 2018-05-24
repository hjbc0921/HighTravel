import React from 'react'
import AddSchedule from "../../../containers/AddSchedule";
import AddTodo from "../../../containers/AddTodo";
import TodoList from "../../../containers/TodoList";
import ShowSchedule from "../../../components/molecules/Calendar";

const HomePage = () => {
  return (
    <div>
     <AddSchedule/>
     <br/><br/>
     <ShowSchedule/> 
     <br/><br/>
     <AddTodo/>
     <br/><br/>
     <TodoList/>
    </div>
  )
}

export default HomePage
