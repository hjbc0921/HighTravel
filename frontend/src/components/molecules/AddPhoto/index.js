import React from 'react'
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Input
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Demo extends React.Component {
  state = {
    folder : this.props.folder
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('err in validated fields', err)
      if (!err) {
        console.log('Received values of form: ', values)
	this.props.onAddPhoto(values.folder, values.photos)
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
  onChange = (e) => {
    console.log(e.target.files[0])
    console.log(this.state.folder)
  }
  beforeUpload = (file) => {
    return false
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
          label="Folder"
          hasFeedback
        >
          {getFieldDecorator('folder', {
            rules: [
              { required: true, message: 'Please select a folder!' },
            ],
          })(
            <Select placeholder="Please select a folder">
            {this.state.folder.length>0 && this.state.folder.map(fold =>
           <Option key = {fold.id} value = {fold.id}>{fold.name}</Option>
            )}
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Photo"
        >
          <div className="dropbox">
            {getFieldDecorator('photos', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
              rules: [
                { required: true, message: 'Please select photos!' },
              ],
            })(
              <Upload.Dragger  beforeUpload={this.beforeUpload} name="image" action="//127.0.0.1:8000/api/photos/">
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

