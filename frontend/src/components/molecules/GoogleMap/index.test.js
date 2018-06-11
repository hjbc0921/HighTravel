import React from 'react'
import { shallow, mount } from 'enzyme'
import MapContainer from './index'

const onGoogleMap = jest.fn()
const wrap = () => mount (<MapContainer />)

it('confirm rendered', () => {
  onGoogleMap.mockClear()
  const wrapper = wrap()
  expect(onGoogleMap).not.toBeCalled()
  const container= wrapper.find('#map1')
  expect(container.length).toBe(0)
})
     
