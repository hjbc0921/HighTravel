import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../../components/atoms/Button'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

export const AddTrip = ({addTrip,onAddTrip}) => {

 let title,sinceWhen,untilWhen;

  const onAddTripBtn = () => {
    onAddTrip(title.value,sinceWhen.value,untilWhen.value)
  }
 
  return (
    <Wrapper>
      <div> {addTrip.message} </div>
      <div> title : <input required ref={node=>{title = node;}} /></div>
      <div> sinceWhen : <input required type ="date" ref={node=>{sinceWhen = node;}}/></div>
      <div> untilWhen : <input required type ="date" ref={node=>{untilWhen = node;}}/></div>
      <Button type ="submit" onClick={onAddTripBtn}>AddTrip</Button>
    </Wrapper>
  )
}

AddTrip.propTypes = {
  title : PropTypes.string.isRequired,
  sinceWhen : PropTypes.string.isRequired,
  untilWhen : PropTypes.string.isRequired
}

AddTrip.defaultProps = {
  title: '',
  sinceWhen:'',
  untilWhen:''
}
//export default AddTrip
