import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { User } from 'components'

storiesOf('User', module)
  .add('default', () => (
    <User />
  ))
