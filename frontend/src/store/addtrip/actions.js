export const ADDTRIP_REQUEST = 'ADDTRIP_REQUEST';

export const addtripRequest = (title,sinceWhen,untilWhen) => {
  return{
   type: ADDTRIP_REQUEST,
   title,
   sinceWhen,
   untilWhen
  }
};
