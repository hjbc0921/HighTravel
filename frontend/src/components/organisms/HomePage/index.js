import React from 'react'
import AddUser from "../../../containers/AddUser";
import AddSchedule from "../../../containers/AddSchedule";
import AddTodo from "../../../containers/AddTodo";
import Sidebar from "../../../containers/Sidebar";
import TodoList from "../../../containers/TodoList";
import Head from "../../../components/molecules/Head";
import Logout from "../../../containers/Logout"
import ShowSchedule from "../../../components/molecules/Calendar";

const HomePage = () => {
  return (
    <div>
     <Head/>
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
