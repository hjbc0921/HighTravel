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
import axios from 'axios'

class Demo extends React.Component {
  state = {
    folder : this.props.folder,
    fileList: [],
    uploading: false,
  }
  componentWillReceiveProps(nextProps) {
    console.log('####################componentWillReceiveProps', this.props,nextProps);
    this.setState({folder:nextProps.folder})
  }
  shouldComponentUpdate(nextProps, nextState) {
      console.log("#########shouldCOmponent",this.props, nextProps, this.state,nextState)
      return (this.props!==nextProps) || (this.state!==nextState)
  }
  handleUpload = () => {
    const { fileList } = this.state;

    this.setState({
      uploading: true,
    });

    const formData = new FormData()
    formData.append('file', fileList[0])
    formData.append('folder',"20120202_test")
    formData.append('tripID',"1")
  
    axios.post('http://localhost:8000/api/photos/',formData,{
        headers : {
            "Authorization" : "token "+sessionStorage.getItem('token'),
        }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const { uploading } = this.state;
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
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
           <Option key = {fold.name} value = {fold.name}>{fold.name}</Option>
            )}
           <Option value="add new folder"><AddFolder/></Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Photo"
        >
          <div className="dropbox">
            {getFieldDecorator('photos', {
              rules: [
                { required: true, message: 'Please select photos!' },
              ],
            })(
              <div>
              <Upload {...props}>
              <Button>
                <Icon type="upload" /> Select File
              </Button>
            </Upload>
            </div>
            )}
          </div>
        </FormItem>
        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button 
          className="upload-demo-start"
          type="primary" 
          name="file" 
          onClick={this.handleUpload}
          disabled={this.state.fileList.length === 0}
          htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

export const AddPhoto = Form.create()(Demo);

