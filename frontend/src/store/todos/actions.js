export const POST_TODO_REQUEST = 'POST_TODO_REQUEST';
export const STORE_TODO = 'STORE_TODO';

let nextTodoId=0

/*
export const toggleTodo = (id) => {
   return {
  type: 'TOGGLE_TODO',
  id
  }
}
*/

// action for post todo (POST to backend)
export const addtodoRequest = (contents) => {
   return {
    type: POST_TODO_REQUEST,
    contents
  }
}

// action for store todo list
export const storeTodo = (tripTodos) => {
    return {
        type: STORE_TODO,
        tripTodos: tripTodos
    }
}
