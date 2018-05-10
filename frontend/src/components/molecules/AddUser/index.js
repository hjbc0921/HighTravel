import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../../components/atoms/Button'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

export const AddUser = ({addUser,onAddUser }) => {
  let username;
  const onAddUserBtn = () =>{
   if(username.value == '')
    throw "fill username"
   else
    onAddUser(username.value);
  }	
  return (
    <Wrapper>
      <div> username : <input ref = {node=>{username = node;}} /></div>
      <Button type = "submit" onClick={onAddUserBtn}>AddUser</Button>
    </Wrapper>
  )
}

AddUser.propTypes = {
  username: PropTypes.string.isRequired
}

AddUser.defaultProps = {
 username:''
}
export default AddUser
