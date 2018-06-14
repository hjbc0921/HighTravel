import React from 'react'
import { Col, Table, Button } from 'antd';
import EditableCell from '../../atoms/EditableCell'
import AddExpense from '../../../containers/Addexpense'

class Expense extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'ID',
      dataIndex: 'id',
    }, {
      title: 'Date',
      dataIndex: 'date',
      render: (text, record) => {
        return (
          sessionStorage.getItem('username') == record.spender ?
          <EditableCell
            value={record.date}
            onChange={this.onCellChange(record.id, record.date, 'date')}
            updated={this.props.updated}
          /> : record.date
        );
      }
    }, {
      title: 'Spender',
      dataIndex: 'spender',
    }, {
      title: 'Contents',
      dataIndex: 'contents',
      render: (text, record) => {
        return (
          sessionStorage.getItem('username') == record.spender ?
          <EditableCell
            value={record.contents}
            onChange={this.onCellChange(record.id, record.contents, 'contents')}
            updated={this.props.updated}
          /> : record.contents
        );
      }
    }, {
      title: 'Money',
      dataIndex: 'money',
      render: (text, record) => {
        return (
          sessionStorage.getItem('username') == record.spender ?
          <EditableCell
            value={record.money}
            onChange={this.onCellChange(record.id, record.money, 'money')}
            updated={this.props.updated}
          /> : record.money
        );
      }
    }];

    var rows = this.createRows(this.props.expense.length, this.props.expense, this.props.totalExpense)

    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      data: rows[0],
      total: rows[1],
      each: rows[2],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updated) {
      var rows = this.createRows(nextProps.expense.length, nextProps.expense, nextProps.totalExpense)
      this.setState({ selectedRowKeys: [], data: rows[0], total: rows[1], each: rows[2] })
    }
  }
  
  createRows = (numRows,expenses,users) => {
    let rows = [];
    var total = 0;
      for (var i=0;i<numRows;i++){
        var exp = expenses[i]
        rows.push({
          key: i.toString(),
          id: i+1,
          realId: exp.id,
          contents: exp.contents,
          money: parseInt(exp.money),
          spender : exp.spender,
          date : exp.date
        })
        total += parseInt(exp.money)
      }
    var user;
    var each = [] 
    for (user in users) {
      each.push(user + " spent " + users[user] + "원 ")
    }
    return [rows,total,each];
  };

  onCellChange = (id, originVal, dataIndex) => {
    return (value) => {
      const data = [...this.state.data];
      const target = data.find(item => item.id === id);
      if (target) {
        if (dataIndex == 'money') {
          if (Number.isInteger(parseInt(value))) {
            target[dataIndex] = value;
            this.props.changeContent(target)
          }
          else {
            target[dataIndex] = originVal;
          }
        }
        else {
          target[dataIndex] = value;
          this.props.changeContent(target)
        }
      }
    };
  }

  deleteBudget = () => {
    var expenses = this.props.expense
    var expIDs = []
    for (var i=0; i<this.state.selectedRowKeys.length; i++)
      expIDs.push(expenses[this.state.selectedRowKeys[i]].id)
    this.props.onDelete(expIDs)
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        disabled: record.spender !== sessionStorage.getItem('username'),
        spender: record.spender
      }),
    };
    const hasSelected = selectedRowKeys.length > 0;
    const columns = this.columns
    const data = this.state.data
    const each = this.state.each
    return (
      <div>
        <h2> Your expense adds up to {this.state.total} 원 </h2>
        {each.map(u => 
          <h2 key={u.toString()}>{u}</h2>)}
        <div style={{ marginBottom: 10 }}>
          <div className="container">
            <div className="eachbutton">
              <AddExpense/>
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

export default Expense
