import React from 'react'
import {Form, Select, Button, Upload, Input, Modal} from 'antd';
import AddFolder from '../../../containers/AddFolder'
const FormItem = Form.Item;
const Option = Select.Option;
import axios from 'axios'
import Icon from 'antd/lib/icon';
import 'antd/dist/antd.css';
import '../../item.css'

class Demo extends React.Component {
  state = {
    folder : [{"name":"20120202_test"}],
    previewVisible: false,
    previewImage: '',
    fileList: [],
    previewList: []
  }
  //close file preview modal
  handleCancel = () => {
  this.setState({ previewVisible: false })
  }

  handleUpload = () => {
  this.props.form.validateFields((err, values) => {
  if (!err) {
    const { fileList } = this.state;
    console.log("#####LIST",fileList)
    fileList.forEach((file) => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('folder',"20120202_test")
    formData.append('tripID',"1")
    var token = sessionStorage.getItem('token')
    axios.post('http://localhost:8000/api/photos/',formData,{
    headers : {
    "Authorization" : "token "+ token
    }
    })
    });
  }})
  };   
  

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
    };
    const { uploading } = this.state;

    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: "picture-card",
      multiple:true,

      //preview for one image
      onPreview:(file) => {
        this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
        });
      },


      //remove file from filelist
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

      //do not send post request
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
        fileList: [...fileList, file],
        }));
        return false;
      },

      fileList: this.state.fileList,
    };

  return (

    <Form>
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
    <Icon type="plus" />
    <div className="ant-upload-text">Upload</div>
    </Upload>
    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
    <img alt="now" style={{ width: '100%' }} src={this.state.previewImage} />
    </Modal>
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
    onClick={this.handleUpload}
    disabled={this.state.fileList.length === 0}
    >
    Submit
    </Button>
    </FormItem>
    </Form>

  );
  }
}
export const None = Form.create()(Demo);