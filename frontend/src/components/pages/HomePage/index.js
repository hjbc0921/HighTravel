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
     <br/><br/>
     <AddSchedule/>
     <br/><br/>
     <AddTodo/>
     <br/><br/>
     <TodoList/>
     <br/><br/>
     <Sidebar/>
    </div>
  )
}

export default HomePage
