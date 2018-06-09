import React from 'react'
import {Tabs} from 'antd'
const TabPane = Tabs.TabPane;
import RuleList from '../../../containers/RuleList'
import TodoList from '../../../containers/TodoList'

const Rules = () => {
  return (
    <Tabs defaultActiveKey="1">
    <TabPane tab="Rules" key="1">
    <div>
        <RuleList/>
    </div>
    </TabPane>
    <TabPane tab="Todos" key="2">
    <div>
      <TodoList/>
    </div>
    </TabPane>
    </Tabs>
  )
}

export default Rules

