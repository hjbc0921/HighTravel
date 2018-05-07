import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../../components/atoms/Button'

const Wrapper = styled.div`
  display: flex;
  padding: 5px;
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
  flex-direction: column;
  align-items: center;
`

export const AddRule = ({ statefunction, onPostRule }) => {
  let input;
  console.log(onPostRule);
  console.log('asdf');

  const onSubmit = () => {
    console.log('outer scope of it');
    if (input != undefined) {
        console.log('inner scope of it');
        onPostRule(input.value);
        console.log('post is done');
        input = '';
    }
  };

  return (
    <Wrapper>
        <input placeholder="contents for new rule" ref={node => {input = node;}} />
        <Button type="submit" onClick={onSubmit}>Add Rule</Button>
    </Wrapper>
  )
}

AddRule.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

//export default AddRule
