import React from 'react'
import { Input, Icon } from 'antd'

class EditableCell extends React.Component {
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
            <Input
              value={value}
              onChange={this.handleChange}
              onPressEnter={this.check}
              suffix={
                <Icon
                  type="check"
                  className="editable-cell-icon-check"
                  onClick={this.check}
                />
              }
            />
          ) : (
            <div style={{ paddingRight: 24 }}>
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
          )
        }
      </div>
    );
  }
}

export default EditableCell
