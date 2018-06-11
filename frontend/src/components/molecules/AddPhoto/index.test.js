import React from 'react'
import { shallow, mount } from 'enzyme'
import AddPhoto from './index'

const onAddPhoto = jest.fn()
const wrap = () => mount (<AddPhoto />)

it('call onAddPhoto when rendered', () => {
  onAddPhoto.mockClear()
  const wrapper = wrap
  expect(onAddPhoto).not.toBeCalled()
})
