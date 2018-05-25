import React from 'react'
import { shallow } from 'enzyme'
import AddSchedule from './index'

const onAddSchedule = jest.fn()
const wrap = (props = {}) => shallow(<AddSchedule onAddSchedule-={onAddSchedule}{...props} />)

it ('calls onAddSchedule when clicked', () => {
   onAddSchedule.mockClear()
   const wrapper = wrap()
   expect(onAddSchedule).not.toBeCalled()
   wrapper.simulate('click')
   expect(onAddSchedule).toBeCalled()
})


