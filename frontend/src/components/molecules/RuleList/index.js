import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../../components/atoms/Button'
//import Rule from '../../../components/atoms/Rule'

const Wrapper = styled.div`
  display: flex;
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
const Rule = styled.div`
  display: flex;
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
  width: 250px;
  text-align: center;
  verical-align: middle;
  line-height: 20px;
  padding: 5px;
  margin-top: 2.5px;
  margin-bottom: 2.5px;
  top: 50%;
  trasnform: translateY(-50%);
  background: #ccccff;
  border-radius: 20px;
  word-wrap: break-word;
  display: inline-block;
`
const Container = styled.div`
  display: flex;
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const RuleList = ({ rules = [] }) => {
    console.log('RuleList component')
    console.log(rules)
    rules.map(rule => {
        console.log(rule.contents)
        console.log(rule.tripID)})

  function changeRule(ruleId) {
    console.log(ruleId)
  }

  return (
    <Wrapper>
        { rules.map(rule => 
/*          <Rule key={rule.id}
                contents={rule.contents}
                tripID={rule.tripID}
          />*/
          <Container key={rule.id}>
          <Rule onClick={ event => changeRule(rule.id) }>{rule.contents}</Rule>
          <Button>Delete</Button>
          </Container>
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
