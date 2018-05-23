import { initialState } from './selectors'
import { signupSuc, signupFail } from './actions'
import signup_reducer from './reducer'

describe('Store Signup Suc', () => {
    it('Store Signup state', () => {
        expect(signup_reducer(
            {message: "JOIN US"},
            signupSuc()
        )).toEqual({message: ''})
    })
})

describe('Store Signup Fail', () => {
    it('Store Signup state', () => {
        expect(signup_reducer(
            {message: "JOIN US"},
            signupFail('test for jest')
        )).toEqual({message: 'test for jest'})
    })
})
