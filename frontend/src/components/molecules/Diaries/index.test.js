import React from 'react'
import { shallow, mount } from 'enzyme'
import Diaries from './index'

const onDiary = jest.fn()
const wrap = () => mount(<Diaries onDiaryConfirm = {onDiary}  />)

it('calls onDiary when rendered', () => {
  onDiary.mockClear()
  const wrapper = wrap()
  expect(onDiary).not.toBeCalled()
})
