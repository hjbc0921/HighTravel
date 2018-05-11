import React from 'react'
import { storiesOf } from '@kadira/storybook'
import TripTitle from '.'

storiesOf('TripTitle', module)
  .add('default', () => (
    <TripTitle>Hello</TripTitle>
  ))
  .add('reverse', () => (
    <TripTitle reverse>Hello</TripTitle>
  ))
