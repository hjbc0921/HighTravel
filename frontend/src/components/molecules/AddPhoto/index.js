import React from 'react'
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Input
} from 'antd';
import AddFolder from '../../../containers/AddFolder'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Demo extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('err in validated fields', err)
      if (!err) {
        console.log('Received values of form: ', values)
	this.props.onAddPhoto(values.contents, values.date, values.photos, values.folder)
      }
    });
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const token = sessionStorage.getItem('token')
    const tripID = sessionStorage.getItem('tripID')
    return (
      <Form onSubmit={this.handleSubmit}>
	<FormItem 
          {...formItemLayout}
	  label="Contents"
	>
	  {getFieldDecorator('contents', {
	    rules: [{ required: true, message: 'Please input the contents of trip!' }],
	  })(
	    <Input />
	  )}
	</FormItem>

        <FormItem
          {...formItemLayout}
          label="Folder"
          hasFeedback
        >
          {getFieldDecorator('folder', {
            rules: [
              { required: true, message: 'Please select a folder!' },
            ],
          })(
            <Select placeholder="Please select a folder">
              <Option value="china">China</Option>
              <Option value="use">U.S.A</Option>
              <Option value="add new folder"><AddFolder/></Option>
            </Select>
          )}
        </FormItem>

	<FormItem 
          {...formItemLayout}
	  label="Date"
	>
	  {getFieldDecorator('date', {
	    rules: [{ required: true, message: 'Please input the date of trip!' }],
	  })(<Input type="date" />)}
	</FormItem>

        <FormItem
          {...formItemLayout}
          label="Photo"
        >
          <div className="dropbox">
            {getFieldDecorator('photos', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload.Dragger name="image" headers={{ Authorization: 'Token ' +  token }} data={{folder: this.props.form.getFieldValue('folder'), date:this.props.form.getFieldValue('date'), contents:this.props.form.getFieldValue('contents'), tripID: tripID}} action="//127.0.0.1:8000/api/photos/">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
              </Upload.Dragger>
            )}
          </div>
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

export const AddPhoto = Form.create()(Demo);

