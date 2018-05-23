import React from 'react'
import { Button, Modal, Form, Input } from 'antd';
const FormItem = Form.Item;

const TripCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create a new trip"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of trip!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="sinceWhen">
              {getFieldDecorator('since', {
                rules: [{ required: true, message: 'Please input the start date of trip!' }],
              })(<Input type="date" />)}
            </FormItem>
            <FormItem label="untilWhen">
              {getFieldDecorator('until', {
                rules: [{ required: true, message: 'Please input the end date of trip!' }],
              })(<Input type="date" />)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export class AddTrip extends React.Component {
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
      this.props.onAddTrip(values.title,values.since,values.until)
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
        <Button type="primary" icon="plus" onClick={this.showModal}>Add Trip</Button>
        <TripCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}


