export const ADDBUDGET_REQUEST = 'ADDBUDGET_REQUEST';
export const ADDBUDGET_FAIL = "ADDBUDGET_FAIL"
export const ADDBUDGET_SUCCESS = "ADDBUDGET_SUCCESS"
export const LOAD_BUDGET = "LOAD_BUDGET"
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

export const loadBudget = (tripBudgets) => {
  return{
    type : LOAD_BUDGET,
    tripBudgets
  }
}

export const addbudgetFail = (err) => {
  return{
    type : ADDBUDGET_FAIL,
    err
  }
}

export const addbudgetRequest = (contents,money) => {
   return{
   type: ADDBUDGET_REQUEST,
   contents,
   money
  }
};

export const addbudgetSuc = (tripBudgets) => {
  return {
    type : ADDBUDGET_SUCCESS,
    tripBudgets
  }
}
