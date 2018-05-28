import React from 'react'
import { shallow } from 'enzyme'
import AddSchedule from './index'

const onShowSchedule = jest.fn()

it('calls onShowSchedule when Clicked', () =>{
   onShowSchedule.mockClear()
   expect(onShowSchedule).not.toBeCalled()
}) 
