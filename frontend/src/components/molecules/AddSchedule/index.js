import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import './../../item.css'
import { Button, Modal, Form, DatePicker, TimePicker, Input } from 'antd';
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;

const ScheduleCreateForm = Form.create()(
  class extends React.Component {
  render() {
	const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
      return (
        <Modal
          visible={visible}
          title="Write a new schedule"
          okText="Add"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Contents">
              {getFieldDecorator('contents', {
                rules: [{ required: true, message: 'Please input the contents of this schedule!' }]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Since and until">
          {getFieldDecorator('dates', {
                rules: [{ required: true, message: 'Please input the dates!' }],
              })(
            <RangePicker />
          )}
        </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export class AddSchedule extends React.Component {
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
    form.validateFields((err, fieldsValue) => {
         if (err) {
              return;
         }
         const rangeValue = fieldsValue['dates'];
         var values = {
          ...fieldsValue,
          'since':rangeValue[0].format('YYYY-MM-DD'), 
          'until':rangeValue[1].format('YYYY-MM-DD'),
        };
         console.log(values);
      this.props.onAddSchedule(values.contents,values.since,values.until)
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
        <Button id="button4" type="primary" icon="plus" onClick={this.showModal}>Add Schedule</Button>
        <ScheduleCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default AddSchedule
