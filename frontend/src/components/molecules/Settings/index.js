import React from 'react'
import { message, Table, Input, Icon, Popconfirm } from 'antd';
import { AddForm } from '../../atoms/AddForm'
import EditableCell from '../../atoms/EditableCell'

message.config({
  top: 4,
  duration: 1,
  maxCount: 3,
});

class Settings extends React.Component {
  constructor(props) {
    super(props);
    var otherUsers = props.users
    var idx = 3
    var users = []
    var u
    for (var i=0; i<otherUsers.length; i++) {
      u = otherUsers[i]
      if (u.username != sessionStorage.getItem('username'))
        users.push({key: ++idx, field: '', data: u.username,})
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
              <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.data)}>
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
      updated: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updated) {
      this.setState({tripInfo: nextProps.tripInfo})
      var otherUsers = nextProps.users
      var idx = 3
      var users = []
      var u
      for (var i=0; i<otherUsers.length; i++) {
        u = otherUsers[i]
        if (u.username != sessionStorage.getItem('username'))
          users.push({key: ++idx, field: '', data: u.username,})
      }
      this.setState({dataSource: users})
    }
    if (this.props.pop && nextProps.pop) {
      if (nextProps.err) {
        message.error(nextProps.msg)
        }
      else {
        message.success(nextProps.msg)
        }
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
    var users = this.props.users
    var remainUsers = users.filter(u => u.username !== key)
    var ids = remainUsers.map(u => u.id)
    this.props.deleteUser(ids)
    this.setState({ dataSource: dataSource.filter(item => item.data !== key) });
  }
  render() {
    const { tripInfo, dataSource } = this.state;
    var source = tripInfo.concat(dataSource)
    const columns = this.columns;
    return (
      <div>
        {(sessionStorage.getItem('owns')=='true') ? <AddForm onAddForm={this.props.onAddUser} icon={'user-add'} placeholder={'Username to invite'} msg={'Please input username to invite!'} btn={'Add User'}/> : null}
        <Table bordered dataSource={source} columns={columns} />
      </div>
    );
  }
}

export default Settings
