export const ADDFOLDER_REQUEST = 'ADDFOLDER_REQUEST'
export const ADDFOLDER_FAIL = "ADDFOLDERFAIL"
export const ADDFOLDER_SUCCESS = "ADDFOLDER_SUCCESS"
export const STORE_FOLDER = "STORE_FOLDER"
export const ADDPHOTO_REQUEST = 'ADDPHOTO_REQUEST'

export const addphotoRequest = (folder,fileList) => {
  return{
    type : ADDPHOTO_REQUEST,
    folder,
    fileList
  }
}
export const storeFolder = (folders) => {
  return{
    type : STORE_FOLDER,
    folders
  }
}

export const addfolderFail = (err) => {
  return{
    type : ADDFOLDER_FAIL,
    err
  }
}

export const addfolderRequest = (name, date) => {
  return{
    type: ADDFOLDER_REQUEST,
    name,
    date
  }
}

export const addfolderSuc = (message) => {
  return {
    type : ADDFOLDER_SUCCESS,
    message
  }
}
