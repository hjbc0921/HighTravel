import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Photos } from 'components'

storiesOf('Photos', module)
  .add('default', () => (
    <Photos>Hello</Photos>
  ))
  .add('reverse', () => (
    <Photos reverse>Hello</Photos>
  ))
