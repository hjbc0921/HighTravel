export const ADDEXPENSE_REQUEST = 'ADDEXPENSE_REQUEST';
export const ADDEXPENSE_FAIL = "ADDEXPENSE_FAIL"
export const ADDEXPENSE_SUCCESS = "ADDEXPENSE_SUCCESS"
export const PATCHEXPENSE_FAIL = "PATCHEXPENSE_FAIL"
export const PATCHEXPENSE_SUCCESS = "PATCHEXPENSE_SUCCESS"
export const CHANGE_EXPENSE_CONTENT = "CHANGE_EXPENSE_CONTENT"
export const DELETE_EXPENSE_ROWS = "DELETE_EXPENSE_ROWS"

export const changeExpenseContent = (idUpdatedRow) => {
  return {
  type : CHANGE_EXPENSE_CONTENT,
  idUpdatedRow
  }
}

export const deleteExpenseRows = (expIDs) => {
  return{
  type : DELETE_EXPENSE_ROWS,
  expIDs
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

export const addexpenseSuc = () => {
  return {
    type : ADDEXPENSE_SUCCESS
  }
}

export const patchexpenseFail = () => {
  return{
    type : PATCHEXPENSE_FAIL,
  }
}

export const patchexpenseSuc = () => {
  return {
    type : PATCHEXPENSE_SUCCESS,
  }
}
