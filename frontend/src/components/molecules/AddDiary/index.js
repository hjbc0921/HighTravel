import React from 'react'
import { Form, Button, Input } from 'antd';
import SelectPhoto from '../../../containers/SelectPhoto'
const FormItem = Form.Item;
const { TextArea } = Input;

class Demo extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
	this.props.onAddDiary(values.date, values.contents, values.photos)
      }
    });
  }

  pickDate = (e) => {
    if (!e || !e.target) {
      return e;
    }
    const { target } = e;
    this.props.selectedDate(target.value)
    return target.value;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    
    return (
      <Form onSubmit={this.handleSubmit}>

        <FormItem 
          {...formItemLayout}
          label="date">
          {getFieldDecorator('date', {
            getValueFromEvent: this.pickDate,
            rules: [{ required: true, message: 'Please select the date of diary!' }],
          })(<Input type="date" />)}
        </FormItem>

        <FormItem 
          {...formItemLayout}
          label="contents">
          {getFieldDecorator('contents', {
            rules: [{ required: true, message: 'Please write the contents of diary!' }],
          })(<TextArea placeholder='Please write the contents of diary!' autosize />)}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="photos">
          {getFieldDecorator('photos', {
              rules: [
                { required: false },
              ],
            })(
                <SelectPhoto/>
          )}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

export const AddDiary = Form.create()(Demo);
