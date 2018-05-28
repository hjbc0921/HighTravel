import React from 'react'
import { shallow } from 'enzyme'
import TodoList from './index'

const onTodoList = jest.fn()

it('calls onTodoList when Clicked', () =>{
   onTodoList.mockClear()
   expect(onTodoList).not.toBeCalled()
}) 
