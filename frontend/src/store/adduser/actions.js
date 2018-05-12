export const ADDUSER_REQUEST = 'ADDUSER_REQUEST';

export const adduserRequest = (username) => {
  return {
    type: ADDUSER_REQUEST,
    username
  }
};
