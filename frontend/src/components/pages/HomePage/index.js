import React from 'react'
import AddUser from "../../../containers/AddUser";
import AddSchedule from "../../../containers/AddSchedule";
import AddTodo from "../../../containers/AddTodo";
import Sidebar from "../../../containers/Sidebar";
import TodoList from "../../../containers/TodoList";
import Header from "../../../components/molecules/Header";
import Logout from "../../../containers/Logout"
import ShowSchedule from "../../../components/molecules/Calendar";

const HomePage = () => {
  return (
    <div>
     <Header/>
     <Logout/>
     <AddUser/>
     <br/><br/>
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
