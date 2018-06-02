import { initialState } from './selectors'
import { addfolderFail, addfolderSuc, addfolderRequest }  from './actions'
import addphoto_reducer from './reducer'

describe('Add folder Fail message', () => {
    it('Store addphoto state', () => {
        expect(addphoto_reducer(
            { message: "", err: "" },
            addfolderFail('Add folder Failed')
        )).toEqual({ message: "", err: "Add folder Failed" })
    })}
)

describe('Add fhoto Success message', () => {
    it('Store addphoto state', () => {
        expect(addphoto_reducer(
            { message: "", err: "" },
            addfolderSuc('Add folder Success')
        )).toEqual({ message: "Add folder Success", err: "" })
    })}
)

describe('Add folder Request', () => {
    it('Store addphoto state', () => {
        expect(addphoto_reducer(
            { message: "Add folder Success", err: "" },
            addfolderRequest("Paris", "2018-01-01")
        )).toEqual({})
    })}
)
