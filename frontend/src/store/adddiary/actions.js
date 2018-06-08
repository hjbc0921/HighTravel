export const PICK_DATE = 'PICK_DATE'
export const POST_DIARY_REQUEST = 'POST_DIARY_REQUEST'
export const STORE_DATE_PHOTO = 'STORE_DATE_PHOTO'

export const pickDate = (date) => {
    return {
        type: PICK_DATE,
        date
    }
}

export const postDiaryRequest = (date, contents, select) => {
    return {
        type: POST_DIARY_REQUEST,
        date,
        contents,
        select
    }
}

export const storeDatePhoto = (photos) => {
    return {
        type: STORE_DATE_PHOTO,
        photos
    }
}
