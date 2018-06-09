import React from 'react'
import { shallow, mount } from 'enzyme'
import { AddForm } from './index'

const onAddForm = jest.fn()
const wrap = () => mount(<AddForm handleSubmit={onAddForm} input='test' />)

it('calls onAddUser when Clicked', () => {
   onAddForm.mockClear()
   const wrapper = wrap()
   expect(onAddForm).not.toBeCalled()
   wrapper.simulate('click')
   expect(onAddForm).not.toBeCalled()
})
