import React from 'react'
import {Tabs} from 'antd'
const TabPane = Tabs.TabPane;
import AddRule from '../../../containers/AddRule'
import RuleList from '../../../containers/RuleList'
import TodoList from '../../../containers/TodoList'
import AddTodo from '../../../containers/AddTodo'

const Rules = () => {
  return (
    <Tabs defaultActiveKey="1">
    <TabPane tab="Rules" key="1">
    <div>
        <RuleList/>
        <AddRule/>
    </div>
    </TabPane>
    <TabPane tab="Todos" key="2">
    <div>
      <TodoList/>
      <AddTodo/>
    </div>
    </TabPane>
    </Tabs>
  )
}

export default Rules

