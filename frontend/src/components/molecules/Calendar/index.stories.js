import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Calendar } from 'components'

storiesOf('Calendar', module)
  .add('default', () => (
    <Calendar>Hello</Calendar>
  ))
  .add('reverse', () => (
    <Calendar reverse>Hello</Calendar>
  ))
