import React from 'react'
import { Table, Input, Icon, Button, Popconfirm } from 'antd';

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    console.log('+++++++++++change', value)
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
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
    var otherUsers = JSON.parse(props.addUser.users)
    var idx = 3
    var users = []
    var u
    for (var i=0; i<otherUsers.length; i++) {
      u = otherUsers[i]
      if (u.name != sessionStorage.getItem('username'))
        users.push({key: ++idx, field: '', name: u.name,})
    }

    var defaultCol = [{
      title: 'trip Info',
      dataIndex: 'field',
      width: '30%',
    }, {
      title: 'data',
      dataIndex: 'name',
      width: '40%',
      render: (text, record) => {
        return (
          (record.key <= 2) && (sessionStorage.getItem('owns')=='true') ?
            <EditableCell
              value={text}
              onChange={this.onCellChange(record.key, 'name')}
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

    var defaultRow =  [{
      key: '0',
      field: 'title',
      name: 'Europe',
    }, {
      key: '1',
      field: 'sinceWhen',
      name: '2018-01-01',
    }, {
      key: '2',
      field: 'tilWhen',
      name: '2018-03-01',
    }, {
      key: '3',
      field: 'users',
      name: sessionStorage.getItem('username'),
    }]

    this.state = {
      dataSource: defaultRow.concat(users),
      count: 5
    }
  }

  onCellChange = (key, dataIndex) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({ dataSource });
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
      name: `Edward King ${count}`,
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
