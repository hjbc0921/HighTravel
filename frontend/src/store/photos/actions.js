export const STORE_PHOTO_REQUEST = 'STORE_PHOTO_REQUEST'
export const STORE_PHOTO = 'STORE_PHOTO'
export const DELETE_PHOTO_REQUEST = 'DELETE_PHOTO_REQUEST'
export const DELETE_FOLDER_REQUEST = 'DELETE_FOLDER_REQUEST'

export const storePhotoRequest = () => {
     return{
      type: STORE_PHOTO_REQUEST
     }

}

export const storePhoto = (photos) => {
    return {
      type: 'STORE_PHOTO',
      photos: photos
    }
}

export const deletePhotoRequest = (photoIDs) => {
    return {
       type : DELETE_PHOTO_REQUEST,
       photoIDs
    }
}

export const deleteFolderRequest = (id) => {
    return {
        type : DELETE_FOLDER_REQUEST,
        id
    }
}
