import React, { PropTypes } from 'react'
import {Button} from 'antd'

export const AddUser = ({addUser, onAddUser}) => {
  let username;
  const onAddUserBtn = () => {
    onAddUser(username.value);
    username.value = ''
  }	
  return (
    <div>
      <div> username : <input required ref = {node=>{username = node;}} /></div>
      <p style= {{ color: addUser.err ? 'red' : 'black' }}>{ addUser.msg }</p>
      <Button type = "default" icon = "user-add" onClick={onAddUserBtn}>AddUser</Button>
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
