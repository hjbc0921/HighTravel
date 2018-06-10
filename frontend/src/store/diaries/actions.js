export const STORE_DIARY_REQUEST = 'STORE_DIARY_REQUEST'
export const STORE_DIARY = 'STORE_DIARY'

export const storeDiaryRequest = () => {
     return{
      type: STORE_DIARY_REQUEST
     }
}

export const storeDiary = (diaries) => {
     return{
         type: 'STORE_DIARY',
         diaries: diaries
     }
}
