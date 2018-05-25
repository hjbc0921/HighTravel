import React from 'react'
import { shallow } from 'enzyme'
import AddRule from './index'

const onAddRule = jest.fn()
const wrap = (props = {}) => shallow(<AddRule onAddRule = {onSubmit} {...props} />)

it('calls onAddRule when Clicked', () => {
    onAddRule.mockClear()
    const wrapper = wrap()
    expect(onAddRule).not.toBeCalled()
    wrapper.simulate('click')
    expect(onAddRule).toBeCalled()
})
