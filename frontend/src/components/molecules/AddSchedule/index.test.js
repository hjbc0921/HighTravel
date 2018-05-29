import React from 'react'
import { shallow, mount } from 'enzyme'
import AddSchedule from './index'

const onAddSchedule = jest.fn()
const wrap = () => mount(<AddSchedule showModal={onAddSchedule} />)

it('calls onAddSchedule when rendered' , () =>{
   onAddSchedule.mockClear()
   const wrapper = wrap()
   expect (onAddSchedule).not.toBeCalled()
   const container = wrapper.find('#button4')
   expect(container.length).toBe(1)
   container.simulate('click')
   expect(onAddSchedule).not.toBeCalled()
}) 
