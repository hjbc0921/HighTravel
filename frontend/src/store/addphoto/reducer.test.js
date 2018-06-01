import { initialState } from './selectors'
import { addfolderFail }  from './actions'
import addphoto_reducer from './reducer'

describe('Add photo Fail message', () => {
    it('Store addphoto state', () => {
        expect(addphoto_reducer(
            { message: "" },
            addfolderFail('Add folder Failed')
        )).toEqual({ message: "Add folder Failed" })
    })}
)
