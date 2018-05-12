export const ADDSCHEDULE_REQUEST = 'ADDSCHEDULE_REQUEST';

export const addscheduleRequest = (contents,since,until) => {
   return {
     type: ADDSCHEDULE_REQUEST,
     contents,
     since,
     until
   }
};

