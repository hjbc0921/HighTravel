import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font }  from 'styled-theme'
import { AddForm } from '../../atoms/AddForm'
// import Todo from '../../../components/atoms/Todo'

const Styledul = styled.ul`
  font-family: ${font('primary')};
`
const Todo = styled.li`
  font-family: ${font('primary')};
`

export const TodoList = ({todoliststate =[], onAddTodo, onTodoClick }) => {
    todoliststate.map(todo => {console.log(todo)})
  return (
    <div>
    <h1>Bucket list for our Trip</h1>
    <AddForm onAddForm={onAddTodo} icon={'profile'} placeholder={'Contents for new Todo'} msg={'Please input content of new todo!'} btn={'Add Todo'}/>
    <Styledul>
      {todoliststate.map(todo =>
        <Todo key={todo.id} style={{textDecoration: todo.done? 'line-through': 'none'}} onClick={ event => onTodoClick(todo.id, !todo.done) }>{todo.contents}</Todo>
          /*
           <Todo key={todo.id}
          {...todo}
          onClick={()=>onTodoClick(todo.id)}
           />
           */
         )}
    </Styledul>
    </div>
  );
};

