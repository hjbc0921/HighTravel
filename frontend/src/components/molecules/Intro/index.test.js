import React from 'react'
import { shallow } from 'enzyme'
import Intro from './index'

const onLogin = jest.fn()
const wrap = (props = {}) => shallow(<Intro onLogin = {onLogin} {...props} />)

it ('calls onLoginBtn when Clicked', () => {
    onLoginBtn.mockClear()
    const wrapper = wrap()
    expect(onLoginBtn).not.toBeCalled()
    wrapper.simulate('click')
    expect(onLoginBtn).toBeCalled()
})

