import { initialState } from './selectors'
import { addfolderFail, addfolderSuc, addfolderRequest }  from './actions'
import addphoto_reducer from './reducer'

describe('Add folder Fail message', () => {
    it('Store addphoto state', () => {
        expect(addphoto_reducer(
            { message: "", err: "", updated:false },
            addfolderFail('Add folder Failed')
        )).toEqual({ message: "", err: "Add folder Failed", updated:false })
    })}
)

describe('Add fhoto Success message', () => {
    it('Store addphoto state', () => {
        expect(addphoto_reducer(
            { message: "", err: "", updated:false },
            addfolderSuc('Add folder Success')
        )).toEqual({ message: "Add folder Success", err: "",updated:true })
    })}
)

describe('Add folder Request', () => {
    it('Store addphoto state', () => {
        expect(addphoto_reducer(
            { message: "Add folder Success", err: "" ,updated:false},
            addfolderRequest("Paris", "2018-01-01")
        )).toEqual({updated:false})
    })}
)
