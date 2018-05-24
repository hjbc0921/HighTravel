import React from 'react'
import { Button, Modal, Form, Input } from 'antd';
const FormItem = Form.Item;

const ExpenseCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Record your expense"
          okText="Add"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Date">
              {getFieldDecorator('date', {
                rules: [{ required: true, message: 'Please input the date when you spent!' }],
              })(
                <Input type="date"/>
              )}
            </FormItem>
            <FormItem label="Contents">
              {getFieldDecorator('contents', {
                rules: [{ required: true, message: 'Please input the contents of this expense!' }],
              })(<Input />)}
            </FormItem>
            <FormItem label="Cost">
              {getFieldDecorator('money', {
                rules: [{ required: true, message: 'Please input the cost of this expense!' }],
              })(<Input placeholder="only the number" />)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export class AddExpense extends React.Component {
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
      this.props.onAddExpense(values.contents,values.date,values.money)
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
        <Button type="primary" icon="plus" onClick={this.showModal}>Add Expense</Button>
        <ExpenseCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}


