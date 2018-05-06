import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Intro } from 'components'

storiesOf('Intro', module)
  .add('default', () => (
    <Intro />
  ))
