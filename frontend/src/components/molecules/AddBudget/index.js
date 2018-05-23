import React from 'react'
import { Button, Modal, Form, Input } from 'antd';
const FormItem = Form.Item;

const BudgetCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Write a new budget"
          okText="Add"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Contents">
              {getFieldDecorator('contents', {
                rules: [{ required: true, message: 'Please input the contents of this budget!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Cost">
              {getFieldDecorator('money', {
                rules: [{ required: true, message: 'Please input the cost of this budget!' }],
              })(<Input placeholder="only the number" />)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export class AddBudget extends React.Component {
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
      this.props.onAddBudget(values.contents,values.money)
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
        <Button type="primary" icon="plus" onClick={this.showModal}>Add Budget</Button>
        <BudgetCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}


