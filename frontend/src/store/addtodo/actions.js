export const ADDTODO_REQUEST = 'ADDTODO_REQUEST';

export const addtodoREQUEST = (contents) => {
  return {
    type: ADDTODO_REQUEST,
    contents
  }
};

