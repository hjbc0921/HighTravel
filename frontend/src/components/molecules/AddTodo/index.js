import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from "../../../components/atoms/Button"

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

export const AddTodo = ({addTodo,onAddTodo}) => {
 let contents;
  const onAddTodoBtn = () =>{
   if(contents.value=='')
   throw "fill contents";
  else
   onAddTodo(contents.value);
} 
  return (
    <Wrapper>
      <div> contents: <input ref={node =>{contents = node;}} /></div>
      <Button type = "submit" onClick = {onAddTodoBtn}>AddTodo</Button>
    </Wrapper>
  )
}

AddTodo.propTypes = {
  contents: PropTypes.string.isRequired
}
AddTodo.defaultProps = {
  contents:''
}

//export default AddTodo
