import React from 'react'
import { shallow } from 'enzyme'
import Intro from './index'

const onLogin = jest.fn()
const wrap = (props = {}) => shallow(<Intro onLogin = {onLoginBtn} {...props} />)

it ('calls onLogin when Clicked', () => {
    onLogin.mockClear()
    const wrapper = wrap()
    expect(onLogin).not.toBeCalled()
    wrapper.simulate('click')
    expect(onLogin).toBeCalled()
})

