import React from 'react'
import { mount } from 'enzyme'
import {Intro} from './index'

const onSignUp= jest.fn()
const tempfunc = jest.fn()
const wrap = () => mount(<Intro intro={{message:'111'}} onLogin={tempfunc} username='111' password='111' />)

it('calls onSignUp when Clicked', () =>{
   onSignUp.mockClear()
   const wrapper = wrap()
   expect(tempfunc).not.toBeCalled()
   const container = wrapper.find('#loginbutton');
   container.simulate('click')
   expect(tempfunc).not.toHaveBeenCalled()
}) 
