import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { PhotoList } from 'components'

storiesOf('PhotoList', module)
  .add('default', () => (
    <PhotoList>Hello</PhotoList>
  ))
  .add('reverse', () => (
    <PhotoList reverse>Hello</PhotoList>
  ))
