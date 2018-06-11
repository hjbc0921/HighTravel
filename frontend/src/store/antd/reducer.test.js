import { initialState } from './selectors'
import { change, toggled } from './actions'
import antd_reducer from './reducer'

describe('Change menu in homepage', () => {
    it('change to money menu', () => {
        expect(antd_reducer(
            {collapsed: false, current:'home'},
            change('money')
        )).toEqual({collapsed:false, current:'money'})
    })
})

describe('Close side menu', () => {
    it('close', () => {
        expect(antd_reducer(
            {collapsed: false, current:'home'},
            toggled(false)
        )).toEqual({collapsed:true, current:'home' })
    })
})
