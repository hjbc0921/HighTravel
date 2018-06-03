import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
const ReactDataGrid = require('react-data-grid');
import AddSchedule from '../../../containers/AddSchedule'
import update from 'react-addons-update';
import {Button, Col} from 'antd'

export class ScheduleList extends React.Component {
	constructor(props, context) {
    super(props, context);
    this._columns = [
      { key: 'id', name: 'ID', width: 80 },
	  { key: 'since', name: 'Since',width: 200},
      { key: 'until', name: 'Until', width: 200},
      { key: 'contents', name: 'Contents', editable:true, width: 300 }];
    var row = this.createRows(this.props.schedules.length,this.props.schedules)
    this.state = { rows: row[0], selectedIndexes : [], total: row[1]};
  }
  componentWillReceiveProps(nextProps) {
    console.log('####################componentWillReceiveProps', this.props,nextProps);
    if (nextProps.updated){
      var row = this.createRows(nextProps.schedules.length,nextProps.schedules)
      this.setState({selectedIndexes : [], rows:row[0], total: row[1]})
    }
  }
  
  shouldComponentUpdate(nextProps, nextState) {
      console.log("#########shouldCOmponent",this.props, nextProps, this.state,nextState)
      return (nextProps.updated ) || (this.props!==nextProps) || (this.state!==nextState)
  }
  createRows = (numRows,schedules) => {
    let rows = [];
    console.log("createRows",schedules)
    for (var i=0;i<numRows;i++){
      var sche = schedules[i]
      rows.push({
        id: i+1,
        contents: sche.contents,
        since: sche.sinceWhen,
		until: sche.tilWhen
      })
    }
    return [rows];
  };

  rowGetter = (i) => {
    return this.state.rows[i];
  };

  handleDelete = () => {
    var schedules = this.props.schedules
    var scheIDs = []
    for (var i=0;i<this.state.selectedIndexes.length;i++){
      scheIDs.push(schedules[this.state.selectedIndexes[i]].id)
    }
    this.props.onDeleteSchedule(scheIDs)
  }
  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    let scheID = this.props.schedule[fromRow].id
    let idUpdatedRow = update(updated,{id:{$set:scheID}})
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
        <h1>Schedule List</h1>
      <div>
      <Col span={12}>{this.state.selectedIndexes.length>0 
	  &&
	  <Button onClick={this.handleDelete} > Delete </Button>}</Col>
      </div>
      <br></br>
      <ReactDataGrid id="schedule"
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
        onGridRowsUpdated={this.handleGridRowsUpdated} 
        />
          </div>
      );

    }
}
export default ScheduleList

