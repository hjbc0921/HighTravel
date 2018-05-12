export const ADDUSER_REQUEST = 'ADDUSER_REQUEST';

export const adduserRequest = (username) => {
  return {
    type: ADDUSER_REQUEST,
    username
  }
};

export const STORE_USERS = 'STORE_USERS';

export const storeUsers = (names) => {
  return {
    type: STORE_USERS,
    users: names
  }
};
