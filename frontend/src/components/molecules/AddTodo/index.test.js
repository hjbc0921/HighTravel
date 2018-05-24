import React from 'react'
import { shallow } from 'enzyme'
import AddTodo from './index'

const onAddTodo = jest.fn()
const wrap = (props = {}) => shallow(<AddTodo onAddTodo = {onAddTodo} {...props} />)

it('calls onAddTodo when clicked', () => {
  onClick.mockClear()
  const wrapper = wrap()
  expect(onAddTodo).not.toBeCalled()
  wrapper.simulate('click')
  expect(onAddTodo).toBeCalled()
})

