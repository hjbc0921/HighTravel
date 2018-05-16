import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Budget } from 'components'

storiesOf('Budget', module)
  .add('default', () => (
    <Budget>Hello</Budget>
  ))
  .add('reverse', () => (
    <Budget reverse>Hello</Budget>
  ))
