import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { AddTrip } from 'components'

storiesOf('AddTrip', module)
  .add('default', () => (
    <AddTrip>Hello</AddTrip>
  ))
  .add('reverse', () => (
    <AddTrip reverse>Hello</AddTrip>
  ))
