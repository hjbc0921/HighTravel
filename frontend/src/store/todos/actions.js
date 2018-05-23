export const POST_TODO_REQUEST = 'POST_TODO_REQUEST';
export const STORE_TODO = 'STORE_TODO';
export const TOGGLE_TODO_REQUEST = 'TOGGLE_TODO_REQUEST';

// action for toggle todo (PATCH to backend)
export const toggleTodo = (todoID, done) => {
    return {
        type: TOGGLE_TODO_REQUEST,
        todoID,
        done
    }
}

// action for post todo (POST to backend)
export const addtodoRequest = (contents) => {
<<<<<<< HEAD
 console.log("add todo request executed")
 return {
    type: POST_TODO_REQUEST,
    contents
  }
=======
    return {
        type: POST_TODO_REQUEST,
        contents
    }
>>>>>>> 5a75129ed11d868571939d06e8d32c6b56d022c9
}

// action for store todo list
export const storeTodo = (tripTodos) => {
    return {
        type: STORE_TODO,
        tripTodos: tripTodos
    }
}
