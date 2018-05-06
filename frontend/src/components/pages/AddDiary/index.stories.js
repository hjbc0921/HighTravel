import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { AddDiary } from 'components'

storiesOf('AddDiary', module)
  .add('default', () => (
    <AddDiary />
  ))
