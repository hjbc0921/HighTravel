import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../../components/atoms/Button'
import './../../item.css'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

export const AddUser = ({ addUser,onAddUser }) => {
    console.log('======rerender component========')
    console.log(addUser)
  let username;
  const onAddUserBtn = () =>{
   if(username.value == '')
    throw "fill username"
   else
    onAddUser(username.value);
   username.value = ''
  }	
  return (
    <div className="adduser">
      <div> username : <input required ref = {node=>{username = node;}} /></div>
      <p style= {{ color: addUser.err ? 'red' : 'black' }}>{ addUser.msg }</p>
      <Button type = "submit" onClick={onAddUserBtn}>AddUser</Button>
    </div>
  )
}

AddUser.propTypes = {
  username: PropTypes.string.isRequired
}

AddUser.defaultProps = {
 username:''
}
export default AddUser
