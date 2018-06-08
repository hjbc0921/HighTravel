import React from 'react'
import { Table, Input, Icon, Button, Popconfirm } from 'antd';

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    originVal: this.props.value,
    editable: false,
    field: this.props.field,
  }
  handleChange = (e) => {
    const value = e.target.value;
    console.log('+++++++++++change', e, value)
    this.setState({ value });
    console.log('---', this.state)
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
      console.log('+++++++++++check', this.state.value)
      // PATCH success
      this.setState({ originVal: this.state.value });
      // PATCH fail
      //this.setState({ value: this.state.originVal });
      console.log('+++++++++++check', this.state.value)
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
        console.log('text', text, 'record', record)
        return (
          (record.key <= 2) && (sessionStorage.getItem('owns')=='true') ?
            <EditableCell
              value={text}
              onChange={this.onCellChange(record.field, 'data')}
              field={record.field}
              //onPatch={this.props.onPatch}
            />  : text
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
            (this.state.dataSource.length > 1) && (record.key > 3) ?
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
      dataSource: defaultRow.concat(users),
      count: 5
    }
  }

  onCellChange = (key, dataIndex) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      console.log('onCellChange', key, dataIndex, value)
      if (key=='sinceWhen') {
        if (dataSource[2].data <= value) {
          console.log('FAIL', 'tilWhen: ', dataSource[2].data, 'sinceWhen: ' , value)
        }
        else {
          console.log('SUCCESS', 'tilWhen: ', dataSource[2].data, 'sinceWhen: ' , value)
        }
      }

      const target = dataSource.find(item => item.key === key);
      /*
      if (target) {
        target[dataIndex] = value;
        this.setState({ dataSource });
      }
      */
      console.log('source', dataSource, this.state.dataSource)
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
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button>
        <Table bordered dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default Settings
