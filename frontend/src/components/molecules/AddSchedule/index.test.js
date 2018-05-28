import React from 'react'
import { shallow } from 'enzyme'
import AddSchedule from './index'

const onAddSchedule = jest.fn()

it('calls onAddSchedule when Clicked', () =>{
   onAddSchedule.mockClear()
   expect(onAddSchedule).not.toBeCalled()
}) 
