import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
const ReactDataGrid = require('react-data-grid');
import AddExpense from '../../../containers/Addexpense'
import update from 'react-addons-update';
import {Button, Col} from 'antd'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`
class MoneyFormatter extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired
  };

  render() {
    const percentComplete = this.props.value + '원';
    return (<div>
      {percentComplete}
      </div>
       );
  }
}

export class Expense extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      { key: 'id', name: 'ID', width: 80 },
      { key: 'date', name: 'Date', editable:true, width:200},
      { key : 'spender', name: 'Spender', width:100},
      { key: 'contents', name: 'Contents', editable:true, width:300 },
      { key: 'money', name: 'Money',editable:true, width:200,formatter: MoneyFormatter } ];
      var row = this.createRows(this.props.expense.length,this.props.expense,this.props.totalExpense)
      this.state = { rows: row[0], selectedIndexes : [], total: row[1], each: row[2]};
  }
  componentWillReceiveProps(nextProps) {
    console.log('####################componentWillReceiveProps', this.props,nextProps);
    if (nextProps.updated2){
      var row = this.createRows(nextProps.expense.length,nextProps.expense,nextProps.totalExpense)
      this.setState({selectedIndexes : [], rows:row[0], total: row[1], each:row[2]})
    }
  }
  
  shouldComponentUpdate(nextProps, nextState) {
      console.log("#########shouldCOmponent",this.props, nextProps, this.state,nextState)
      return (nextProps.updated2 ) || (this.props!==nextProps) || (this.state!==nextState)
  }

  createRows = (numRows,expenses,users) => {
    let rows = [];
    var total = 0;
    console.log("createRows",expenses)
      for (var i=0;i<numRows;i++){
        var exp = expenses[i]
        rows.push({
          id: i+1,
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
      each += user + " spent " + users[user]
    }
    return [rows,total,each];
  };
  rowGetter = (i) => {
    return this.state.rows[i];
  };

  handleDelete = () => {
    var expenses = this.props.expense
    var expIDs = []
    for (var i=0;i<this.state.selectedIndexes.length;i++){
      expIDs.push(expenses[this.state.selectedIndexes[i]].id)
    }
    this.props.onDelete(expIDs)
  }

  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    let expID = this.props.expense[fromRow].id
    let idUpdatedRow = update(updated,{id:{$set:expID}})
    this.props.changeContent(idUpdatedRow)
   
    let updatedRow = update(this.state.rows, {[fromRow]:{$merge: updated}});
    this.setState({ rows:updatedRow });
    
  };

  onRowsSelected = (rows) => {
    let rowIndexes = rows.map(r => r.rowIdx);
    console.log(rowIndexes)
    this.setState({selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx))});
  };

  onRowsDeselected = (rows) => {
    let rowIndexes = rows.map(r => r.rowIdx);
    console.log(rowIndexes)
    console.log(rowIndexes.indexOf(0))
    console.log("##filter##",this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 ))
    this.setState({selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 )});
  };

  onCellSelected = ({ rowIdx, idx }) => {
    this.grid.openCellEditor(rowIdx, idx);
  };

  render() {
    return  (
      <div>
        <h2> Your expense adds up to {this.state.total} 원 </h2>
        <h2> {this.state.each} </h2>
        <div>
        <Col span={12}><AddExpense/></Col>
        <Col span={12}>
      {this.state.selectedIndexes.length>0 && <Button onClick={this.handleDelete} > Delete </Button>}
      </Col>
      </div>
      <br></br>
      <ReactDataGrid
        ref={ node => this.grid = node }
        rowKey = "id"
        rowSelection={{
          showCheckbox: true,
          enableShiftSelect: true,
          onRowsSelected: this.onRowsSelected,
          onRowsDeselected: this.onRowsDeselected,
          selectBy: {
            indexes: this.state.selectedIndexes
          }}}
        enableCellSelect={true}
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        minHeight={500}
        //onCellSelected={this.onCellSelected}
        onGridRowsUpdated={this.handleGridRowsUpdated} 
        />
          </div>
      );
  }
}

