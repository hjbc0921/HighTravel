export const PICK_DATE = 'PICK_DATE'
export const POST_DIARY_REQUEST = 'POST_DIARY_REQUEST'

export const pickDate = (date) => {
    return {
        type: 'PICK_DATE',
        date
    }
}

export const postDiaryRequest = (date, contents, photos) => {
    return {
        type: POST_DIARY_REQUEST,
        date,
        contents,
        photos
    }
}
