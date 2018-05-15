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
