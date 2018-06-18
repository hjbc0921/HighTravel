import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font } from 'styled-theme'
import {Link} from 'react-router'
import img from './../../image.jpg'
import { Input, Button, Form, message } from 'antd'
import Icon from 'antd/lib/icon'
import 'antd/dist/antd.css'
import '../../item.css'
const FormItem = Form.Item;

message.config({
  top: 400,
  duration: 5,
  maxCount: 3,
})

const Wrapper = styled.div`
  font-family: ${font('primary')};
  text-align: center;
  margin: auto;
  border: 1px solid #000;
  background-image: url(${img});
  background-size: cover;
  width: 100vw;
  height: 100vh;
`

const InnerWrapper = styled.div`
  display: inline-grid;
  margin-top: 12vh;
  text-align: center;
`

class NormalLoginForm extends React.Component {
  error = () => {
    if (this.props.intro.message!==""){
      message.error("Wrong username or wrong passwor")
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onLogin(values.userName,values.password)
        this.props.form.resetFields()
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Wrapper>
      <InnerWrapper>
        <h1 className="hightravel">High, Travel!</h1>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem style={{margin:"20px 0 0 0"}}>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input  placeholder="Enter your username"
          style = {{width:"200px"}}
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          )}
        </FormItem>
        <FormItem style={{margin:"0 0 0 0"}}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input  placeholder="Enter your password"
          style = {{width:"200px"}}
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          )}
        </FormItem>
        <div className="mywarning">{this.props.intro.message}</div>
        <FormItem style={{margin:"10px 2px 0 0"}}>
        <Button type="submit" style={{ width:'200px', margin: '4px 0' }} onClick={this.handleSubmit} icon="login">login</Button>  
        </FormItem>
        </Form>
       
        <div>
        <Link to="/signup" > <Button id="button5" icon="user-add" style={{ width:'200px',margin: '8px 0' }} > signup </Button> </Link>
        </div>
      </InnerWrapper>
      </Wrapper>
    );
  }
}
export const Intro = Form.create()(NormalLoginForm);