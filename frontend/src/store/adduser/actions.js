export const STORE_ENDS = 'STROE_ENDS';

export const storeEnds = () => {
  return {
    type: STORE_ENDS,
  }
};

export const ADDUSER_REQUEST = 'ADDUSER_REQUEST';

export const adduserRequest = (username) => {
    console.log('=====Adduser Request action==')
    console.log(username)
  return {
    type: ADDUSER_REQUEST,
    username
  }
};

export const STORE_USERS = 'STORE_USERS';

export const storeUsers = (users) => {
  return {
    type: STORE_USERS,
    users: users
  }
};

export const STORE_STATUS = 'STORE_STATUS';

export const storeStatus = (msg, err) => {
  return {
    type: STORE_STATUS,
    msg: msg,
    err: err
  }
};
