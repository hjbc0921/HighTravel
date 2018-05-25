import React from 'react'
import { shallow } from 'enzyme'
import AddUser from './index'

const onAddUser = jest.fn()
const wrap = (props = {}) => shallow(<AddUser onAddUser={onAddUserBtn} {...props} />)

it ('calls onAddUser when Clicked', () => {
    onAddUser.mockClear()
    const wrapper = wrap()
    expect(onAddUser).not.toBeCalled()
    wrapper.simulate('click')
    expect(onAddUser).toBeCalled()
})


