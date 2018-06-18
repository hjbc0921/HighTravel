import { initialState } from './selectors'

const todos_reducer = (state = initialState, action)=>{
    switch (action.type) {
        case 'STORE_TODO':
            sessionStorage.setItem('todos', JSON.stringify(action.tripTodos))
            return Object.assign({}, state, {
                todos: action.tripTodos
            })
        default:
            return state
     }
}
export default todos_reducer
