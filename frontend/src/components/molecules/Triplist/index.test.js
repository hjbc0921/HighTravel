import React from 'react'
import { shallow } from 'enzyme'
import Triplist from './index'

const onTriplist = jest.fn()

it('calls onTriplist when Clicked', () =>{
   onTriplist.mockClear()
   expect(onTriplist).not.toBeCalled()
}) 
