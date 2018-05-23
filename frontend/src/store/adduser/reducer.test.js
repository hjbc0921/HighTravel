import { initialState } from './selectors'
import { storeUsers }  from './actions'
import adduser_reducer from './reducer'

describe('Store Users', () => {
    it('Store add user state', () => {
        expect(adduser_reducer(
            { users: [], msg: '', err: 'false' },
            storeUsers([{id: 1, username: 'admin'}], 'user added', false)
        )).toEqual({users: [{id: 1, username: 'admin'}], msg: 'user added', err: false})
    })}
)
