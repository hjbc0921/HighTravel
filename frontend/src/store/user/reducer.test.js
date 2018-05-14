import { initialState } from './selectors'
import { storeTrip, storeTripId } from './actions'
import user_reducer from './reducer'

describe('Store Trip list', () => {
    it('Store Trip change state', () => {
        expect(user_reducer(
            {},
            storeTrip([{id: 0, title: 'test for jest'}])
        )).toEqual({trips: [{id: 0, title: 'test for jest'}]})
    })
})

describe('Store Trip ID', () => {
    it('Store Trip change state', () => {
        expect(user_reducer(
            {},
            storeTripId(1)
        )).toEqual({tripID: 1})
    })
})
