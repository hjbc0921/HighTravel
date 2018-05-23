export const ADDBUDGET_REQUEST = 'ADDBUDGET_REQUEST';
export const ADDBUDGET_FAIL = "ADDBUDGET_FAIL"
export const ADDBUDGET_SUCCESS = "ADDBUDGET_SUCCESS"

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
