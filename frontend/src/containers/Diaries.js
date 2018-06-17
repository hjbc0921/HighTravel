import { connect } from 'react-redux'
import { Diaries} from '../components/molecules/Diaries'
import { deleteDiaryRequest } from '../store/diaries/actions'

const mapStateToProps = (state) => {
    var diaries = []
    if (sessionStorage.getItem('diaryList')!="undefined" && sessionStorage.getItem('diaryList')!==null){
       diaries = JSON.parse(sessionStorage.getItem('diaryList'))
   }
   console.log("CONT######",diaries)
   return {
     diary_list : diaries
   }
}
const mapDispatchToProps = (dispatch) => {
     return {
		changeDiaryContent: (idUpdatedRow) => {
			dispatch(changeDiaryContent(idUpdatedRow))
		},
		onDeleteDiary: (diaryID)=> {
			dispatch(deleteDiaryRequest(diaryID))
        	}
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Diaries) 
