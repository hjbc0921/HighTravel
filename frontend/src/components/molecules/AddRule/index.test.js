 
import React from 'react'
import { shallow } from 'enzyme'
import AddRule from './index'

const onAddRule = jest.fn()

it('calls onAddRule when Clicked', () =>{
   onAddRule.mockClear()
   expect(onAddRule).not.toBeCalled()
}) 
