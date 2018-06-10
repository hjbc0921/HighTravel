import { connect } from 'react-redux'
import { Diaries} from '../components/molecules/Diaries'

const mapStateToProps = (state) => {
    var diaries = []
    if (sessionStorage.getItem('diaryList')!="undefined"){
       diaries = JSON.parse(sessionStorage.getItem('diaryList'))
   }
   return {
     diary_list : diaries
   }
}
const mapDispatchToProps = (dispatch) => {
     return {


     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Diaries) 
