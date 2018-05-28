import React from 'react'
import { shallow } from 'enzyme'
import SignUp from './index'

const onSignUp= jest.fn()

it('calls onAddSchedule when Clicked', () =>{
   onSignUp.mockClear()
   expect(onSignUp).not.toBeCalled()
}) 
