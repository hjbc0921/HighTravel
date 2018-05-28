import React from 'react'
import { shallow } from 'enzyme'
import Logout from './index'

const onLogout = jest.fn()
const wrap = (props = {}) => shallow(<Logout onLogoutBtn={onLogout} {...props} />)

it('calls onLogout when Clicked', () => {
   onLogout.mockClear()
   const wrapper = wrap()
   expect(onLogout).not.toBeCalled()
   wrapper.simulate('click')
   expect(onLogout).not.toBeCalled()
})
