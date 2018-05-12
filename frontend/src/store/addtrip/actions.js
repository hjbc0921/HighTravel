export const ADDTRIP_REQUEST = 'ADDTRIP_REQUEST';
export const ADDTRIP_FAIL = "ADDTRIP_FAIL"

export const addtripFail = (err) => {
  return{
    type : ADDTRIP_FAIL,
    err
  }
}
export const addtripRequest = (title,sinceWhen,untilWhen) => {
  return{
   type: ADDTRIP_REQUEST,
   title,
   sinceWhen,
   untilWhen
  }
};
