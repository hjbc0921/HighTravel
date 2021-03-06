import { connect } from 'react-redux'
import { Diaries} from '../components/molecules/Diaries'
import { deleteDiaryRequest, changeDiaryContent } from '../store/diaries/actions'

const mapStateToProps = (state) => {
    var diaries = []
    if (sessionStorage.getItem('diaryList')!="undefined" && sessionStorage.getItem('diaryList')!==null){
       diaries = JSON.parse(sessionStorage.getItem('diaryList'))
   }
   return {
     diary_list : diaries
   }
}
const mapDispatchToProps = (dispatch) => {
     return {
        changeDiaryContent: (id, contents) => {
            dispatch(changeDiaryContent(id, contents))
        },
        onDeleteDiary: (diaryID)=> {
            dispatch(deleteDiaryRequest(diaryID))
        }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Diaries) 
