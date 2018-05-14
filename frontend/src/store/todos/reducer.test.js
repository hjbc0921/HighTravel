import { initialState } from './selectors'
import { storeTodo } from './actions'
import user_reducer from './reducer'

describe('Store Todo list', () => {
    it('Store Todo change state', () => {
        expect(user_reducer(
            {},
            storeTodo([{id: 0, contents: 'test for jest'}])
        )).toEqual({todos: [{id: 0, contents: 'test for jest'}]})
    })
})
