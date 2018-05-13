import { connect} from 'react-redux'
// import { toggleTodo } from '../store/tods/actions'
import { TodoList } from '../components/molecules/TodoList'

const mapStateToProps = (state) => {
    console.log('Todolist container')
    console.log(state)
  return {
    todoliststate: state.todos.todos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
   onTodoClick: (id) => {
     // dispatch(toggleTodo(id))
     }
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
