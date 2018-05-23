import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { ScheduleList } from 'components'

storiesOf('ScheduleList', module)
  .add('default', () => (
    <ScheduleList>Hello</ScheduleList>
  ))
  .add('reverse', () => (
    <ScheduleList reverse>Hello</ScheduleList>
  ))
