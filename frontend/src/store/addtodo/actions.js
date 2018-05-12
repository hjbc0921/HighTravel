export const ADDTODO_REQUEST = 'ADDTODO_REQUEST';

let nextTodoId=0

export const addTodo = (contents) => {
   return {
   type: 'ADD_TODO',
   id: nextTodoId++,
   contents
   }
}

export const toggleTodo = (id) => {
   return {
  type: 'TOGGLE_TODO',
  id
  }
}
export const addtodoREQUEST = (contents) => {
  return {
    type: ADDTODO_REQUEST,
    contents
  }
};

