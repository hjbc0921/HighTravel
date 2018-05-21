import { initialState } from './selectors'

const todos_reducer = (state = initialState, action)=>{
    console.log('todos_reducer')
    console.log(state)
    console.log(action)
    console.log(action.type)
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
