import React from 'react'
import { Table, Input, Icon, Button, Popconfirm } from 'antd';

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

class Settings extends React.Component {
  constructor(props) {
    super(props);
    var otherUsers = props.users
    var idx = 3
    var users = []
    var u
    for (var i=0; i<otherUsers.length; i++) {
      u = otherUsers[i]
      if (u.name != sessionStorage.getItem('username'))
        users.push({key: ++idx, field: '', data: u.name,})
    }

    var defaultCol = [{
      title: 'trip Info',
      dataIndex: 'field',
      width: '30%',
    }, {
      title: 'data',
      dataIndex: 'data',
      width: '40%',
      render: (text, record) => {
        return (
          (record.key <= 2) && (sessionStorage.getItem('owns')=='true') ?
            <EditableCell
              value={record.data}
              onChange={this.onCellChange(record.field, 'data')}
	      updated={this.props.updated}
            />  : record.data
        );
      },
    }]

    var adminCol = [] // only admin can delete user
    if (sessionStorage.getItem('owns')=='true')
      adminCol = [{
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            record.key > 3 ?
              <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                <a href="javascript:;">Delete</a>
              </Popconfirm>
             : null
          );
        },
      }];

    this.columns = defaultCol.concat(adminCol)

    var defaultRow = this.props.tripInfo
    this.state = {
      tripInfo: defaultRow,
      dataSource: users,
      count: 5,
      updated: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updated) {
      this.setState({tripInfo: nextProps.tripInfo})
    }
  }

  onCellChange = (key, dataIndex) => {
    return (value) => {
      const tripInfo = [...this.state.tripInfo];
      const target = tripInfo.find(item => item.field === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({ tripInfo });
	this.props.onPatch(key, value)
      }
    };
  }

  onDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      data: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }
  render() {
    const { tripInfo, dataSource } = this.state;
    var source = tripInfo.concat(dataSource)
    const columns = this.columns;
    return (
      <div>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button>
        <Table bordered dataSource={source} columns={columns} />
      </div>
    );
  }
}

export default Settings
