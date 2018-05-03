import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { AddRule } from 'components'

storiesOf('AddRule', module)
  .add('default', () => (
    <AddRule>Hello</AddRule>
  ))
  .add('reverse', () => (
    <AddRule reverse>Hello</AddRule>
  ))
