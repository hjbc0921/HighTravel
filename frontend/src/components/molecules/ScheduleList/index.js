import React from 'react'
import { Col, Table, Button } from 'antd';
import EditableCell from '../../atoms/EditableCell'
import AddSchedule from '../../../containers/AddSchedule'

class ScheduleList extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'ID',
      dataIndex: 'id',
    }, {
      title: 'Since',
      dataIndex: 'sinceWhen',
      render: (text, record) => {
        return (
          <EditableCell
            value={record.sinceWhen}
            onChange={this.onCellChange(record.id, record.sinceWhen, 'sinceWhen')}
            updated={this.props.updated}
          />
        );
      }
    }, {
      title: 'Until',
      dataIndex: 'tilWhen',
      render: (text, record) => {
        return (
          <EditableCell
            value={record.tilWhen}
            onChange={this.onCellChange(record.id, record.tilWhen, 'tilWhen')}
            updated={this.props.updated}
          />
        );
      }
    }, {
      title: 'Contents',
      dataIndex: 'contents',
      render: (text, record) => {
        return (
          <EditableCell
            value={record.contents}
            onChange={this.onCellChange(record.id, record.contents, 'contents')}
            updated={this.props.updated}
          />
        );
      }
    }];


    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      data: this.createRows(this.props.schedules), 
    };
  }

  createRows = (schedules) => {
    var sched = []
    for (var i=0; i<schedules.length; i++)
      sched.push({
        key: i.toString(),
        id: i+1,
        realId: schedules[i].id,
        sinceWhen: schedules[i].sinceWhen,
        tilWhen: schedules[i].tilWhen,
        contents: schedules[i].contents
      })
    return sched
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updated) {
      this.setState({ selectedRowKeys: [], data: this.createRows(nextProps.schedules) })
    }
  }
  
  onCellChange = (id, originVal, dataIndex) => {
    return (value) => {
      const data = [...this.state.data];
      const target = data.find(item => item.id === id);
      const realId = target.realId
      if (target) {
          target[dataIndex] = value;
      }
          this.props.changeContent(target)
    }
  }

  deleteSchedule = () => {
    var schedules = this.props.schedules
    var schedIDs = []
    for (var i=0; i<this.state.selectedRowKeys.length; i++)
      schedIDs.push(schedules[this.state.selectedRowKeys[i]].id)
    this.props.onDeleteSchedule(schedIDs)
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const columns = this.columns;
    const data = this.state.data
    return (
      <div>
        <div style={{ marginBottom: 10 }}>
          <div className="container">
            <div className="eachbutton">
              <AddSchedule/>
            </div>
            <div className="eachbutton">
              <Button
                type="primary"
                onClick={this.deleteSchedule}
                disabled={!hasSelected}
              >
                Delete
              </Button>
            </div>
          </div>
          <span style={{ marginLeft: 140 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} size="small"/>
      </div>
    );
  }
}

export default ScheduleList
