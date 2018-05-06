import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { AddPhoto } from 'components'

storiesOf('AddPhoto', module)
  .add('default', () => (
    <AddPhoto />
  ))
