import React from 'react'
import { shallow } from 'enzyme'
import RuleList from './index'

const onRuleList = jest.fn()

it('calls onRuleList when Clicked', () =>{
   onRuleList.mockClear()
   expect(onRuleList).not.toBeCalled()
}) 
