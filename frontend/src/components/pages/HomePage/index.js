import React from 'react'
import AddUser from "../../../containers/AddUser";
import AddSchedule from "../../../containers/AddSchedule";
import AddTodo from "../../../containers/AddTodo";
import Sidebar from "../../../containers/Sidebar";
import TodoList from "../../../containers/TodoList";
import Header from "../../../components/molecules/Header";

const HomePage = () => {
  return (
    <div>
     <Header/>
     <AddUser/>
     <br/><br/>
     <AddSchedule/>
     <br/><br/>
     <AddTodo/>
     <br/><br/>
     <TodoList/>
    </div>
  )
}

export default HomePage
