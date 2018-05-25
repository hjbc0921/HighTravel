export const ADDPHOTO_REQUEST = 'ADDPHOTO_REQUEST';
export const ADDPHOTO_FAIL = "ADDPHOTO_FAIL"


export const addtripFail = (err) => {
   return{
      type: ADDPHOTO_FAIL,
      err
   }
}

export const addphotoRequest = (selectedFile,text) => {
   return{
      type: ADDPHOTO_REQUEST,
      selectedFile,
      text
   }
};
