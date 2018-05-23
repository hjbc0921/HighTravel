import { initialState } from './selectors'
import { IntroReceived, loginFailed }  from './actions'
import intro_reducer from './reducer'

describe('Store userinfo', () => {
    it('Store intro state', () => {
        expect(intro_reducer(
            {trying: false, success: false, error: false, message: "", username: "", token: "", userId: ""},
            IntroReceived({username: 'admin', token: '2703064ee14987e8bf3b6023620042bf8b644d52a', userId: 1 })
        )).toEqual({trying: true, success: true, error: false, message: "", username: 'admin', token: '2703064ee14987e8bf3b6023620042bf8b644d52a', userId: 1 })
    })
})

describe('Store loginfailed', () => {
    it('Store intro state', () => {
        expect(intro_reducer(
            {trying: false, success: false, error: false, message: "", username: "", token: "", userId: ""},
            loginFailed('Login FAILED')
        )).toEqual({trying: true, success: false, error: true, message: 'Login FAILED', username: "", token: "", userId: "" })
    })
})
