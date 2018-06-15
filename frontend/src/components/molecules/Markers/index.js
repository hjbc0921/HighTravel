import React from 'react'
import { Col, Table, Button } from 'antd';
import EditableCell from '../../atoms/EditableCell'

const budgets = [{
  key: 0,
  id: 1,
  contents: 'marker1',
  money: 10
  }, {
  key: 1,
  id: 2,
  contents: 'marker2',
  money: 10
}]

  
class Markers extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'ID',
      dataIndex: 'id',
    }, {
      title: 'Contents',
      dataIndex: 'contents',
      render: (text, record) => {
        return (
          <EditableCell
            value={record.contents}
            onChange={this.onCellChange(record.id, record.contents, 'contents')}
            //updated={this.props.updated}
            updated={true}
          />
        );
      }
    }, {
      title: 'Money',
      dataIndex: 'money',
      render: (text, record) => {
        return (
          <EditableCell
            value={record.money}
            onChange={this.onCellChange(record.id, record.money, 'money')}
            //updated={this.props.updated}
            updated={true}
          />
        );
      }
    }];

  //  var rows = this.createRows(this.props.budget)

    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      data: budgets,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updated) {
      //var rows = this.createRows(nextProps.budget)
      this.setState({ selectedRowKeys: [], data: budgets })
    }
  }
  
  createRows = (budgets) => {
    var rows = []
    //var budgets = this.props.budget
    for (var i=0; i<budgets.length; i++) {
      var bud = budgets[i]
      rows.push({
        key: i.toString(),
        realId: bud.id,
        id: i+1,
        contents: bud.contents,
        money: parseInt(bud.money)
      })
    }
    return rows
  }

  onCellChange = (id, originVal, dataIndex) => {
    return (value) => {
      const data = [...this.state.data];
      const target = data.find(item => item.id === id);
      if (target) {
        if (dataIndex == 'money') {
          if (Number.isInteger(parseInt(value))) {
            target[dataIndex] = value;
            //this.props.changeContent(target)
          }
          else {
            target[dataIndex] = originVal;
          }
        }
        else {
          target[dataIndex] = value;
          //this.props.changeContent(target)
        }
      }
    }
  }

  deleteBudget = () => {
    //var budgets = this.props.budget
    var budIDs = []
    for (var i=0; i<this.state.selectedRowKeys.length; i++)
      budIDs.push(budgets[this.state.selectedRowKeys[i]-1].id)
    //this.props.onDelete(budIDs)
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  render() {
    const { loading, selectedRowKeys } = this.state;
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
            </div>
            <div className="eachbutton">
              <Button
                type="primary"
                onClick={this.deleteBudget}
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
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default Markers
