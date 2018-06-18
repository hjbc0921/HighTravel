import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font }  from 'styled-theme'
import { AddForm } from '../../atoms/AddForm'
import { Button } from 'antd'
 import Todo from '../../../components/atoms/Todo'

const Styledul = styled.ul`
  font-family: ${font('primary')};
`
export const TodoList = ({todoliststate =[], onAddTodo, onTodoClick, onDeleteTodo }) => {
  return (
    <div className="rulelistwrapper">
    <h1>Bucket list for our Trip</h1>
      {todoliststate.map(todo =>
        <div className="ruleelement" key={todo.id} >
          <Todo key={todo.id}
              contents={todo.contents}
              completed={todo.done}
              onClick={()=>onTodoClick(todo.id, !todo.done)}
           />
          <Button onClick={ event => onDeleteTodo(todo.id) }>Delete</Button>
        </div>
         )}
    <AddForm onAddForm={onAddTodo} icon={'profile'} placeholder={'Contents for new Todo'} msg={'Please input content of new todo!'} btn={'Add Todo'}/>
    </div>
  );
};
