import { initialState } from './selectors'
import { addtripFail }  from './actions'
import addtrip_reducer from './reducer'

describe('Add trip Fail message', () => {
    it('Store addtrip state', () => {
        expect(addtrip_reducer(
            { message: "" },
            addtripFail('Add trip Failed')
        )).toEqual({ message: "Add trip Failed" })
    })}
)
