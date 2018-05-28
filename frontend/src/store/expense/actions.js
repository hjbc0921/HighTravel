export const ADDEXPENSE_REQUEST = 'ADDEXPENSE_REQUEST';
export const ADDEXPENSE_FAIL = "ADDEXPENSE_FAIL"
export const ADDEXPENSE_SUCCESS = "ADDEXPENSE_SUCCESS"
export const CHANGE_CONTENT = "CHANGE_CONTENT"
export const DELETE_ROWS = "DELETE_ROWS"

export const changeContent = (idUpdatedRow) => {
  return {
  type : CHANGE_CONTENT,
  idUpdatedRow
  }
}

export const deleteRows = (budIDs) => {
  return{
  type : DELETE_ROWS,
  budIDs
  }
}

export const addexpenseFail = (err) => {
  return{
    type : ADDEXPENSE_FAIL,
    err
  }
}

export const addexpenseRequest = (contents,date,money) => {
   return{
   type: ADDEXPENSE_REQUEST,
   contents,
   date,
   money
  }
};

export const addexpenseSuc = (tripExpenses) => {
  return {
    type : ADDEXPENSE_SUCCESS,
    tripExpenses
  }
}
