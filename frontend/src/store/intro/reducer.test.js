import { initialState } from './selectors'
import {loginFailed} from './actions'
import intro_reducer from './reducer'

describe('login failed', () => {
    it('user info does not exist', () => {
        expect(intro_reducer(
            {message: ""},
            loginFailed("login failed")
        )).toEqual({message:"login failed"})
    })
})
