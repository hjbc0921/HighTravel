import { initialState } from './selectors'
import { addfolderFail, addfolderSuc, addfolderRequest }  from './actions'
import addphoto_reducer from './reducer'

describe('Add folder Fail message', () => {
    it('Store addphoto state', () => {
        expect(addphoto_reducer(
            { error: false, updated:false },
            addfolderFail('Add folder Failed')
        )).toEqual({ error: true, updated:false })
    })}
)

describe('Add fhoto Success message', () => {
    it('Store addphoto state', () => {
        expect(addphoto_reducer(
            { error:false, updated:false },
            addfolderSuc('Add folder Success')
        )).toEqual({ error:false,updated:true })
    })}
)

describe('Add folder Request', () => {
    it('Store addphoto state', () => {
        expect(addphoto_reducer(
            { error:false,updated:false},
            addfolderRequest("Paris", "2018-01-01")
        )).toEqual({error:false,updated:false})
    })}
)
