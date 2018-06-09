import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { AddUser } from 'components'

storiesOf('AddUser', module)
  .add('default', () => (
    <AddUser>Hello</AddUser>
  ))
  .add('reverse', () => (
    <AddUser reverse>Hello</AddUser>
  ))
