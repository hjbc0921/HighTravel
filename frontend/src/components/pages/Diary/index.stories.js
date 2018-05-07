import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Diary } from 'components'

storiesOf('Diary', module)
  .add('default', () => (
    <Diary />
  ))
