import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
const ReactDataGrid = require('react-data-grid');
import AddBudget from '../../../containers/Addbudget'
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

export class Budget extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      { key: 'id', name: 'ID', width: 80 },
      { key: 'contents', name: 'Contents', editable:true, width: 300 },
      { key: 'money', name: 'Money', editable:true, width: 200, formatter: MoneyFormatter} ];
    var row = this.createRows(this.props.budget.length,this.props.budget)
    this.state = { rows: row[0], selectedIndexes : [], total: row[1]};
  }
  componentWillReceiveProps(nextProps) {
    console.log('####################componentWillReceiveProps', this.props,nextProps);
    if (nextProps.updated){
      var row = this.createRows(nextProps.budget.length,nextProps.budget)
      this.setState({selectedIndexes : [], rows:row[0], total: row[1]})
    }
  }
  
  shouldComponentUpdate(nextProps, nextState) {
      console.log("#########shouldCOmponent",this.props, nextProps, this.state,nextState)
      return (nextProps.updated ) || (this.props!==nextProps) || (this.state!==nextState)
  }

  createRows = (numRows,budgets) => {
    let rows = [];
    var total = 0;
    console.log("createRows",budgets)
    for (var i=0;i<numRows;i++){
      var bud = budgets[i]
      rows.push({
        id: i+1,
        contents: bud.contents,
        money: parseInt(bud.money)
      })
      total += parseInt(bud.money)
    }
    return [rows,total];
  };

  rowGetter = (i) => {
    return this.state.rows[i];
  };

  handleDelete = () => {
    var budgets = this.props.budget
    var budIDs = []
    for (var i=0;i<this.state.selectedIndexes.length;i++){
      budIDs.push(budgets[this.state.selectedIndexes[i]].id)
    }
    this.props.onDelete(budIDs)
  }

  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    let budID = this.props.budget[fromRow].id
    let idUpdatedRow = update(updated,{id:{$set:budID}})
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
    this.setState({selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 )});
  };

  onCellSelected = ({ rowIdx, idx }) => {
    this.grid.openCellEditor(rowIdx, idx);
  };

  render() {
    return  (
      <div>
        <h2> Your budget adds up to {this.state.total} 원 </h2>
      <div>
      <Col span={12}><AddBudget/></Col>
      <Col span={12}>{this.state.selectedIndexes.length>0 && <Button onClick={this.handleDelete} > Delete </Button>}</Col>
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

