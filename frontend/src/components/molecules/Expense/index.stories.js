import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Expense } from 'components'

storiesOf('Expense', module)
  .add('default', () => (
    <Expense>Hello</Expense>
  ))
  .add('reverse', () => (
    <Expense reverse>Hello</Expense>
  ))
