import React, { PropTypes } from 'react'
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddUserForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
	this.props.onAddUser(values.userName)
        this.props.form.resetFields()
      }
    });
  }
  render() {
  const { getFieldDecorator } = this.props.form;
  const { getFieldError } = this.props.form;
  const { getFieldsError } = this.props.form;
  const { isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={userNameError ? 'error' : ''}
          help={userNameError || ''}
        >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input username to invite!' }],
          })(
            <Input prefix={<Icon type="user-add" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username to invite" />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Add User
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export const AddUser = Form.create()(AddUserForm);
