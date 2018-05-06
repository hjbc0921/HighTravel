import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Photo } from 'components'

storiesOf('Photo', module)
  .add('default', () => (
    <Photo />
  ))
