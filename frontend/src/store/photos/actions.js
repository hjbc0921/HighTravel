export const STORE_PHOTO_REQUEST = 'STORE_PHOTO_REQUEST'
export const STORE_PHOTO = 'STORE_PHOTO'
export const DELETE_PHOTO_REQUEST = 'DELETE_PHOTO_REQUEST'

export const storePhotoRequest = () => {
     console.log("5")
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
    console.log('action to deletePhotoRequest')
    return {
       type : DELETE_PHOTO_REQUEST,
       photoIDs
    }
}
