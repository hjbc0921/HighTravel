import React from 'react'
import { Modal, Form, Input } from 'antd';
import AddFolderButton from '../../atoms/AddFolderButton'
const FormItem = Form.Item;

const FolderCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create a new folder"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
         <p>If you select date 2018-01-01 and name your folder as Paris, the Folder will be created as 20180101_Paris</p>
          <Form layout="vertical">
            <FormItem label="Folder name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the name of folder!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="date">
              {getFieldDecorator('date', {
                rules: [{ required: true, message: 'Please input the date of folder!' }],
              })(<Input type="date" />)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export class AddFolder extends React.Component {
  state = {
    visible: false,
  };
  showModal = () => {
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.onAddFolder(values.name,values.date)
      form.resetFields();
      this.setState({ visible: false });
    });
    
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  render() {
    return (
      <div>
        <AddFolderButton onClick={this.showModal}>+ Add Folder</AddFolderButton>
        <FolderCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}
