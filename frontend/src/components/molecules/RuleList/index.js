import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Rule from '../../../components/atoms/Rule'

const Wrapper = styled.ul`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

export const RuleList = ({ rules = [] }) => {
    console.log('RuleList component')
    console.log(rules)
    rules.map(rule => {
        console.log(rule.contents)
        console.log(rule.tripID)})
  return (
    <Wrapper>
        { rules.map(rule => 
          <Rule key={rule.id}
                contents={rule.contents}
                tripID={rule.tripID}
          />
        )}
    </Wrapper>
  )
}

RuleList.propTypes = {
  rules: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    contents: PropTypes.string,
    tripID: PropTypes.number
  })),
  reverse: PropTypes.bool,
}

//export default RuleList
