export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAIL = 'SIGNUP_FAIL'

export const signupRequest = (username, password) => {
  return {
    type: SIGNUP_REQUEST,
    username,
    password
  }
}

export const signupSuc = () => {
    return {
        type : SIGNUP_SUCCESS
    }
}

export const signupFail = (err) => {
    return {
        type : SIGNUP_FAIL,
        err
    }
}

