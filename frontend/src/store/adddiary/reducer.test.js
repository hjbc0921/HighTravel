import { initialState } from './selectors'
import { addDiarySuc, addDiaryFail, pickDate, postDiaryRequest, storeDatePhoto} from './actions'
import adddiary_reducer from './reducer'

describe('add diary success', () => {
    it('success', () => {
        expect(adddiary_reducer(
            {updated: false, error: false, photos:[]},
            addDiarySuc()
        )).toEqual({updated:true, error:false, photos:[]})
    })
})

describe('add diary fail', () => {
    it('faile', () => {
        expect(adddiary_reducer(
            {updated: false, error:false, photos:[]},
            addDiaryFail()
        )).toEqual({updated:false, error:true, photos:[] })
    })
})
