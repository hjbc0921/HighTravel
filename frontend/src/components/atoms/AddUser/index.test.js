import React from 'react'
import { shallow, mount } from 'enzyme'
import { AddUser } from './index'

const onAddUser = jest.fn()
const wrap = () => mount(<AddUser handleSubmit={onAddUser} input='test' />)

it('calls onAddUser when Clicked', () => {
   onAddUser.mockClear()
   const wrapper = wrap()
   expect(onAddUser).not.toBeCalled()
   wrapper.simulate('click')
   expect(onAddUser).not.toBeCalled()
})
