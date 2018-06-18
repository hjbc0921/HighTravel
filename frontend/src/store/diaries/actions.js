export const STORE_DIARY_REQUEST = 'STORE_DIARY_REQUEST'
export const STORE_DIARY = 'STORE_DIARY'
export const DELETE_DIARY_REQUEST = 'DELETE_DIARY_REQUEST'
export const CHANGE_DIARY_CONTENT = 'CHANGE_DIARY_CONTENT'

export const storeDiaryRequest = () => {
     return {
      type: STORE_DIARY_REQUEST
     }
}

export const storeDiary = (diaries) => {
     return {
         type: 'STORE_DIARY',
         diaries: diaries
     }
}

export const changeDiaryContent = (id, contents) => {
    return {
        type : CHANGE_DIARY_CONTENT,
        id,
        contents
    }
}

export const deleteDiaryRequest = (diaryID) => {
    return {
        type: DELETE_DIARY_REQUEST,
        diaryID
    }
}
