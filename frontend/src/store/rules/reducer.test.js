import { initialState } from './selectors'
import { storeRule } from './actions'
import rules_reducer from './reducer'

describe('Store Rule', () => {
    it('Store Rule change state', () => {
        expect(rules_reducer(
            [],
            storeRule([{id: 0, contents: 'test for jest', tripID: 1}])
        )).toEqual({rules: [{id: 0, contents: 'test for jest', tripID: 1}]})
    })
})
