import { initialState } from './selectors'
import { storeSchedule } from './actions'
import schedules_reducer from './reducer'

describe('Store schedules', () => {
    it('Store Signup state', () => {
        expect(schedules_reducer(
            [],
            storeSchedule({since: '2018-01-10', until: '2018-10-10', contents: 'Europe travel'})
        )).toEqual({ schedules: {since: '2018-01-10', until: '2018-10-10', contents: 'Europe travel' }, "updated":true})
    })
})