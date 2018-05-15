import { initialState } from './selectors'
import { logoutRequest } from './actions'
import logout_reducer from './reducer'

describe('Logout', () => {
    it('Logout state updated', () => {
        expect(logout_reducer(
            {},
            logoutRequest()
        )).toEqual({trying: true, success: true, error: false, message: ""})
    })
})
