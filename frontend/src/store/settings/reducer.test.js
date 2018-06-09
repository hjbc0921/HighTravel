import { initialState } from './selectors'
import { storeUsers }  from './actions'
import settings_reducer from './reducer'

describe('Store Users', () => {
    it('Store add user state', () => {
        expect(settings_reducer(
            { users: [], msg: '', err: 'false', updated: false },
            storeUsers([{id: 1, username: 'admin'}], 'user added', false)
        )).toEqual({users: [{id: 1, username: 'admin'}], msg: 'user added', err: false, updated: true})
    })}
)
