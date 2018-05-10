import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { AddSchedule } from 'components'

storiesOf('AddSchedule', module)
  .add('default', () => (
    <AddSchedule>Hello</AddSchedule>
  ))
  .add('reverse', () => (
    <AddSchedule reverse>Hello</AddSchedule>
  ))
