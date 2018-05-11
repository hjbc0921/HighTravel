import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../../components/atoms/Button'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

export const AddSchedule = ({addSchedule,onAddSchedule }) => {
  let contents,since,until;
  const onAddScheduleBtn = () => {
  if(contents.value = '')
  throw "fill contents";
  else if (since.value == '')
  throw "fill since";
  else if (until.value == '')
  throw "fill until";
  else
   onAddSchedule(contents.value,since.value,until.value);
  }
  return (
    <Wrapper>
      <div> contents: <input ref={node=>{contents = node;}} /></div>
      <div> since: <input type="date" ref={node=>{since=node;}}/></div>
      <div> until: <input type="date" ref={node=>{until=node;}}/></div>
      <Button type="submit" onClick={onAddScheduleBtn}>AddSchedule</Button>
    </Wrapper>
  )
}

AddSchedule.propTypes = {
  contents:PropTypes.string.isRequired,
  since:PropTypes.string.isRequired,
  untilWhen: PropTypes.string.isRequired
}

AddSchedule.defaultProps = {
  contents:'',
  since:'',
  until:''
}
export default AddSchedule
