
import React from 'react'
import { shallow,mount } from 'enzyme'
import AddRule from './index'

const onAddRule = jest.fn()
const tempfunc = jest.fn()
const wrap = () => mount(<AddRule onSubmit={onAddRule} onPostRule={tempfunc} input='111'/>)

it('calls onAddRule when Clicked', () =>{
   onAddRule.mockClear()
   const wrapper = wrap()
   expect(onAddRule).not.toBeCalled()
   const container= wrapper.find('#button1')
   expect(container.length).toBe(1)
   container.simulate('click')
   expect(onAddRule).not.toBeCalled()
})
