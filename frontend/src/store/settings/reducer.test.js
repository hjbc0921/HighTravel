import { initialState } from './selectors'
import { storeUsers, storeTripInfo }  from './actions'
import settings_reducer from './reducer'

describe('Store Users', () => {
    it('Store add user state', () => {
        expect(settings_reducer(
            { msg: '', pop: false, err: false, updated: false },
            storeUsers('user added', false)
        )).toEqual({msg: 'user added', pop: true, err: false, updated: true})
    })}
)

/*
describe('Store Trip Info', () => {
    it('Store trip info state', () => {
        expect(settings_reducer(
            { msg: '', pop: false, err: false, updated: false },
            storeTripInfo()
        )).toEqual({msg: '', pop: false, err: false, updated: true})
    })}
)
*/
