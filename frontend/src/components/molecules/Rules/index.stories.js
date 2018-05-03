import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Rules } from 'components'

storiesOf('Rules', module)
  .add('default', () => (
    <Rules>Hello</Rules>
  ))
  .add('reverse', () => (
    <Rules reverse>Hello</Rules>
  ))
