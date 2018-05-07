import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Money } from 'components'

storiesOf('Money', module)
  .add('default', () => (
    <Money />
  ))
