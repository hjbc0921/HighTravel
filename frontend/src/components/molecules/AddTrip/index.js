import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

export const AddTrip = ({ children, ...props }) => {
 let title,sinceWhen,untilWhen;
  const onAddTripBtn = () => {
   if(title.value=='')
   throw "fill title"
   if(sinceWhen.value=='')
   throw "fill sinceWhen"
   if(untilWhen.value=='')
   throw "fill untilWhen")
   else 
    onAddTrip(title.value,sinceWhen.value,untilWhen.value);
  return (
    <Wrapper>
      <div> title : <input ref={node=>{title = node;}} /></div>
      <div> sinceWhen : <input type ="date" ref={node=>{sinceWhen = node;}}/></div>
      <div> untilWhen : <input type ="date" ref={node=>{untilWhen = node;}}/></div>
      <Button type ="submit" onClick={onAddTripBtn}>AddTrip</Button>
    </Wrapper>
  )
}

AddTrip.propTypes = {
  title : PropTypes.string.isRequired,
  sinceWhen : PropTypes.object.isRequired,
  untilWhen : PropTypes.object.isRequired
}

AddTrip.defaultProps = {
  title: '',
  sinceWhen:'',
  untilWhen:''
}
export default AddTrip
