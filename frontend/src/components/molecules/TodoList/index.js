import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font }  from 'styled-theme'
// import Todo from '../../../components/atoms/Todo'

const Styledul = styled.ul`
  font-family: ${font('primary')};
`
const Todo = styled.li`
  font-family: ${font('primary')};
`

export const TodoList = ({todoliststate =[],onTodoClick }) => {
    todoliststate.map(todo => {console.log(todo)})
  return (
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
  );
};

TodoList.propTypes = {
  todoliststate:PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number,
  completed: PropTypes.bool,
  contents:PropTypes.string
  })),
  reverse: PropTypes.bool,
}

// export default TodoList
