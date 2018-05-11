import {connect} from 'react-redux'
import {AddTodo} from '../components/molecules/AddTodo';
import {addtodoRequest} from '../store/addtodo/actions';

const mapStateToProps = (state) => {
   return {
    addTodo: state.addtodo,
   }
};

const mapDispatchToProps = (dispatch) =>{
  return {
     onAddTodo: (contents) ->{
       dispatch(addtodoRequest(contents))
     }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)

