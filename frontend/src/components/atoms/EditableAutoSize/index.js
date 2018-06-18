import React from 'react'
import { Input, Icon } from 'antd'
const { TextArea } = Input;

class EditableAutoSize extends React.Component {
  state = {
    value: this.props.value,
    updated: this.props.updated,
    editable: false,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.updated) {
      this.setState({value: nextProps.value})
    }
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ? (
            <TextArea
              value={value}
              onChange={this.handleChange}
              onPressEnter={this.check}
              autosize
            />
          ) : (
            <div style={{ paddingRight: 24 }}>
            <h2>
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </h2>
            </div>
          )
        }
      </div>
    );
  }
}

export default EditableAutoSize
