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
    console.log('################3', this.props.expense)

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
        console.log('%%%%%%%%%%%componentReceive', rows[0], rows[1], rows[2])
      this.setState({ selectedRowKeys: [], data: rows[0], total: rows[1], each: rows[2] })
    }
  }
  
  createRows = (numRows,expenses,users) => {
    let rows = [];
    var total = 0;
    console.log("createRows",expenses)
      for (var i=0;i<numRows;i++){
        var exp = expenses[i]
        rows.push({
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
    var each = ""
    for (user in users) {
      each += user + " spent " + users[user] + "원 " 
    }
    console.log('%%%%%%%%%%%5', rows, total, each)
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
            console.log('MONEY_CHANGE', target)
          }
          else {
            target[dataIndex] = originVal;
            console.log('MONEY_CHANGE_INVALID', target)
          }
        }
        else {
          target[dataIndex] = value;
          this.props.changeContent(target)
            console.log('CONTENT_CHANGE', target)
        }
      }
    };
      this.setState({ data });
  }

  deleteBudget = () => {
    var expenses = this.props.expense
    var expIDs = []
    for (var i=0; i<this.state.selectedRowKeys.length; i++) {
      expIDs.push(expenses[this.state.selectedRowKeys[i]].id)
        console.log(this.state.selectedRowKeys[i])
        }
    this.props.onDelete(expIDs)
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('###########################3', selectedRowKeys)
    this.setState({ selectedRowKeys });
  }
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        disabled: record.spender !== sessionStorage.getItem('username'),
        //checked: record.spender === sessionStorage.getItem('username') ? true : false,
        spender: record.spender
      }),
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log('$$$$$$$$$$444444', selected, selectedRows, changeRows)
        return (selectedRows) => {
          selectedRows.filter(r.spender !== sessionStorage.getItem('username')) 
        }
      }
    };
    const hasSelected = selectedRowKeys.length > 0;
    const columns = this.columns;
    const data = this.state.data
    return (
      <div>
        <h2> Your expense adds up to {this.state.total} 원 </h2>
        <h2> {this.state.each} </h2>
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
