import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { AddTrip } from 'components'

storiesOf('AddTrip', module)
  .add('default', () => (
    <AddTrip />
  ))
