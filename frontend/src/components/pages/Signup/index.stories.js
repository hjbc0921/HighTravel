import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Signup } from 'components'

storiesOf('Signup', module)
  .add('default', () => (
    <Signup />
  ))
