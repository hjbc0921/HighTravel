import React from 'react'
import { message, Form, Button, Input } from 'antd';
import { SelectPhoto } from '../SelectPhoto'
const FormItem = Form.Item;
const { TextArea } = Input;
message.config({
  top: 400,
  duration: 5,
  maxCount: 3,
})

class Demo extends React.Component {
  constructor(props){
    super(props)
    this.state = {photos:[]}
    this.selectPhoto = this.selectPhoto.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    console.log('####################componentWillReceiveProps', this.props,nextProps);
 
    if (!this.props.updated && nextProps.updated) {
      this.setState({photos:[]})
      message.success('New Diary added');
    }
    if (!this.props.error && nextProps.error){
      message.error('Failed to add diary')
      this.setState({photos:[]})
      this.props.form.resetFields()
    }
  }
  
  shouldComponentUpdate(nextProps, nextState) {
      console.log("#########shouldCOmponent",this.props, nextProps, this.state,nextState)
      return nextProps.updated || (this.props!==nextProps) || (this.state!==nextState)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        let selected = this.state.photos.map(p=>p.selected);
        let select = []
        if (selected.length>0){
          for (let i=0;i<selected.length;i++){
            if (selected[i]===true){
              select.push(i)
            }
          }
        }
        this.props.onAddDiary(values.date, values.contents, select)
        this.props.form.resetFields()
      }
    });
  }

  selectPhoto(event, obj) {
    let photos = this.props.photos;
    photos[obj.index].selected = !photos[obj.index].selected;
    this.setState({ photos: photos });
  }

  pickDate = (e) => {
    if (!e || !e.target) {
      return e;
    }
    const { target } = e;
    if (target.value!=="")
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
                <SelectPhoto photos={this.props.photos} onSelectPhoto={this.selectPhoto}/>
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
