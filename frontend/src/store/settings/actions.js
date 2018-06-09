export const STORE_ENDS = 'STROE_ENDS';
export const ADDUSER_REQUEST = 'ADDUSER_REQUEST';
export const STORE_USERS = 'STORE_USERS';
export const TRIP_PATCH_REQUEST = 'TRIP_PATCH_REQUEST';

export const storeEnds = () => {
  return {
    type: STORE_ENDS,
  }
};

export const adduserRequest = (username) => {
    console.log('=====Adduser Request action==')
    console.log("add user request executed")
console.log(username)
  return {
    type: ADDUSER_REQUEST,
    username
  }
};

export const tripPatchRequest = (key, value) => {
    console.log('=====tripPATCH Request action==', key, value)
  return {
    type: TRIP_PATCH_REQUEST,
    key,
    value
  }
};

export const storeUsers = (users, msg, err) => {
  return {
    type: STORE_USERS,
    users,
    msg,
    err
  }
};

/*
export const STORE_STATUS = 'STORE_STATUS';

export const storeStatus = (msg, err) => {
  return {
    type: STORE_STATUS,
    msg: msg,
    err: err
  }
};
*/
