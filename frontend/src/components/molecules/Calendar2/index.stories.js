import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Calendar2 } from 'components'

storiesOf('Calendar2', module)
  .add('default', () => (
    <Calendar2>Hello</Calendar2>
  ))
  .add('reverse', () => (
    <Calendar2 reverse>Hello</Calendar2>
  ))
