import React from 'react'
import AddUser from "../../../containers/AddUser";
import AddSchedule from "../../../containers/AddSchedule";
import AddTodo from "../../../containers/AddTodo";
import Sidebar from "../../../containers/Sidebar";
import TodoList from "../../../containers/TodoList";

const HomePage = () => {
  return (
    <div>
     <AddUser/>
     <AddSchedule/>
     <AddTodo/>
     <TodoList/>
     <Sidebar/>
    </div>
  )
}

export default HomePage
