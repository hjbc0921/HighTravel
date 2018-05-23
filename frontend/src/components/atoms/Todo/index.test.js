import React from 'react'
import { shallow } from 'enzyme'
import Todo from './index'

const onClick = jest.fn() 
const wrap = (props = {}) => shallow(<Todo onClick = {onClick} {...props} />) 

it ('calls onClick when Clicked', () => { 
onClick.mockClear() 
const wrapper = wrap() 
expect(onClick).not.toBeCalled() 
wrapper.simulate('click') 
expect(onClick).toBeCalled() 
 }) 
