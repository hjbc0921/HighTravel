import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../../components/atoms/Button'

const Wrapper = styled.div`
  display: flex;
  padding: 5px;
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const AddRule = ({ statefunction, onPostRule }) => {
  let input
  var empty

  const onSubmit = () => {
    if (input != undefined) {
        onPostRule(input.value)
        input.value = ''
    }
  };

  return (
    <form>
        <Wrapper>
            <input id="content" required type="text" placeholder="contents for new rule" ref={node => {input = node;}} />
            <Button type="submit" onClick={onSubmit}>Add Rule</Button>
        </Wrapper>
    </form>
  )
}

AddRule.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}
