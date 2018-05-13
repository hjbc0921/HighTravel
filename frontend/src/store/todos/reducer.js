import { initialState } from './selectors'

/*
const toggleTodo = (todo, action) => {
   if(todo.id !== action.id) {
     return todo
   }
   return {
   ...todo,
     completed: !todo.completed
   }
}
*/

const todos_reducer = (state = initialState, action)=>{
    console.log('todos_reducer')
    console.log(state)
    console.log(action)
    console.log(action.type)
    switch (action.type) {
        case 'STORE_TODO':
            return Object.assign({}, state, {
                todos: action.tripTodos
            })
            /*
        case 'TOGGLE_TODO':
            return state.map(t=>
                toggleTodo(t, action)
            )
            */
        default:
            return state
     }
}
export default todos_reducer
