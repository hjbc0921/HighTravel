import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Header } from 'components'

storiesOf('Header', module)
  .add('default', () => (
    <Header>Hello</Header>
  ))
  .add('reverse', () => (
    <Header reverse>Hello</Header>
  ))
