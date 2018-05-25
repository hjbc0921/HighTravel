import { connect } from 'react-redux'
import { postScheduleRequest } from '../store/todolist/actions'
import { Calendar } from "../components/molecules/Calendar"

const mapStateToProps = (state) => {
  return {
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
