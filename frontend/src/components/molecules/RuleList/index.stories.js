import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { RuleList } from 'components'

storiesOf('RuleList', module)
  .add('default', () => (
    <RuleList>Hello</RuleList>
  ))
  .add('reverse', () => (
    <RuleList reverse>Hello</RuleList>
  ))
