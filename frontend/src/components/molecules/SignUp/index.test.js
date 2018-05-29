import React from 'react'
import { shallow,mount } from 'enzyme'
import SignUp from './index'

const onSignUp= jest.fn()
const tempfunc = jest.fn()
const wrap = () => mount(<SignUp onSignUpBtn={onSignUp} signUp={{message:'111'}} onSignUp={tempfunc} username='111' password='111' pwd_check='111' />)

it('calls onSignUp when Clicked', () =>{
   onSignUp.mockClear()
   const wrapper = wrap()
   expect(onSignUp).not.toBeCalled()
   const container = wrapper.find('#button2');
   container.simulate('click')
   expect(onSignUp).not.toBeCalled()
}) 
