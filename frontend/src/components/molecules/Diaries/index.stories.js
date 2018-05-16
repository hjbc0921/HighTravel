import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Diaries } from 'components'

storiesOf('Diaries', module)
  .add('default', () => (
    <Diaries>Hello</Diaries>
  ))
  .add('reverse', () => (
    <Diaries reverse>Hello</Diaries>
  ))
