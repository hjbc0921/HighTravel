import { connect} from 'react-redux'
import { toggleTodo, addtodoRequest } from '../store/todos/actions'
import { TodoList } from '../components/molecules/TodoList'

const mapStateToProps = (state) => {
    var todos = sessionStorage.getItem('todos')

    return {
        todoliststate: JSON.parse(todos)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddTodo: (contents) => {
          dispatch(addtodoRequest(contents))
        },
        onTodoClick: (todoID, done) => {
            dispatch(toggleTodo(todoID, done))
     }
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
