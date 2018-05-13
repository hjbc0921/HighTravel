import {connect} from 'react-redux'
import {AddTodo} from '../components/molecules/AddTodo';
import { addtodoRequest } from '../store/todos/actions';

const mapStateToProps = (state) => {
   return {
    statefunction: state
   }
};

const mapDispatchToProps = (dispatch) =>{
  return {
     onAddTodo: (contents) =>{
       dispatch(addtodoRequest(contents))
     }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)

