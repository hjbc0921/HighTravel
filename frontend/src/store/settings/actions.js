export const STORE_TRIP_INFO = 'STROE_TRIP_INFO';
export const ADDUSER_REQUEST = 'ADDUSER_REQUEST';
export const STORE_USERS = 'STORE_USERS';
export const TRIP_PATCH_REQUEST = 'TRIP_PATCH_REQUEST';
export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';

export const storeEnds = () => {
  return {
    type: STORE_ENDS,
  }
};

export const adduserRequest = (username) => {
  return {
    type: ADDUSER_REQUEST,
    username
  }
};

export const deleteUserRequest = (ids) => {
  return {
    type: DELETE_USER_REQUEST,
    ids
  }
};

export const tripPatchRequest = (key, value) => {
  return {
    type: TRIP_PATCH_REQUEST,
    key,
    value
  }
};

export const storeUsers = (msg, err) => {
  return {
    type: STORE_USERS,
    msg,
    err
  }
};

export const storeTripInfo = () => {
  return {
    type: STORE_TRIP_INFO
  }
};
