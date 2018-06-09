import React, { PropTypes } from 'react'
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddElementForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
	this.props.onAddForm(values.userName)
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
            rules: [{ required: true, message: this.props.msg }],
          })(
            <Input prefix={<Icon type={this.props.icon} style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={this.props.placeholder} />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            {this.props.btn}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export const AddForm = Form.create()(AddElementForm);
