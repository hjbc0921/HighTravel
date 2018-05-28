export const ADDBUDGET_REQUEST = 'ADDBUDGET_REQUEST';
export const ADDBUDGET_FAIL = "ADDBUDGET_FAIL"
export const ADDBUDGET_SUCCESS = "ADDBUDGET_SUCCESS"
export const PATCHBUDGET_FAIL = "PATCHBUDGET_FAIL"
export const PATCHBUDGET_SUCCESS = "PATCHBUDGET_SUCCESS"
export const LOAD_BUDGET = "LOAD_BUDGET"
export const CHANGE_BUDGET_CONTENT = "CHANGE_BUDGET_CONTENT"
export const DELETE_BUDGET_ROWS = "DELETE_BUDGET_ROWS"

export const changeBudgetContent = (idUpdatedRow) => {
  return {
  type : CHANGE_BUDGET_CONTENT,
  idUpdatedRow
  }
}

export const deleteBudgetRows = (budIDs) => {
  return{
  type : DELETE_BUDGET_ROWS,
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
}

export const addbudgetSuc = (tripBudgets) => {
  return {
    type : ADDBUDGET_SUCCESS,
    tripBudgets
  }
}

export const patchbudgetSuc = () => {
  return {
    type : PATCHBUDGET_SUCCESS,
  }
}

export const patchBudgetFail = () => {
  return{
    type : PATCHBUDGET_FAIL,
  }
}
