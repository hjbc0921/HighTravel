import {connect} from 'react-redux'
import {AddTodo} from '../components/molecules/AddTodo';
import {addTodo,addtodoRequest} from '../store/addtodo/actions';

const mapStateToProps = (state) => {
   return {
    statefunction: state
   }
};

const mapDispatchToProps = (dispatch) =>{
  return {
     onAddTodo: (contents) =>{
       dispatch(addTodo(contents))
     }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)

