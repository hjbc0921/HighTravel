import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Rule from '.'

storiesOf('Rule', module)
  .add('default', () => (
    <Rule>Hello</Rule>
  ))
  .add('reverse', () => (
    <Rule reverse>Hello</Rule>
  ))
