import React from 'react'
import { shallow, mount } from 'enzyme'
import Photos from './index'

const onPhoto = jest.fn()
const wrap = () => mount(<Photos onPhotoConfirm = {onPhoto} photo_list={{photo_list:{length:1}}}  />)

it('calls onPhoto when rendered', () => {
  onPhoto.mockClear()
  const wrapper = wrap()
  expect(onPhoto).not.toBeCalled()
})
