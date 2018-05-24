import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
const ReactDataGrid = require('react-data-grid');
import AddExpense from '../../../containers/Addexpense'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

export class Expense extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.createRows();
    this._columns = [
      { key: 'id', name: 'ID' },
      { key: 'date', name: 'Date', editable:true},
      { key : 'spender', name: 'Spender'},
      { key: 'contents', name: 'Contents', editable:true },
      { key: 'money', name: 'Money',editable:true } ];

    this.state =  { rows: this.createRows(5) };
  }

  createRows = (numberOfRows) => {
    let rows = [];
    var total = 0;
    for (let i = 1; i < numberOfRows; i++) {
      rows.push({
        id: i,
        contents: 'ticket'+i,
        date : "05/04",
        spender : sessionStorage.getItem('username'),
        money: i * 100000
      });
      total += i*100000;
    }
    rows.push({id:""});
    rows.push({id:"total",spender: 'swpp1', money: total});

    return rows;
  };

  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    let rows = this.state.rows.slice();
    console.log("EXPENSE PARAM!!!!!!!!",fromRow,toRow,updated)
    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      console.log("EXPENSE ROW########",rowToUpdate)
      console.log("EXPENSE COL@@@@@@@",rowToUpdate.id)
      let updatedRow = update(rowToUpdate, {$merge: updated});
      rows[i] = updatedRow;
    }

    this.setState({ rows });
  };

  rowGetter = (i) => {
    return this.state.rows[i];
  };

  render() {
  return  (
    <div>
    <ReactDataGrid
      enableCellSelect={true}
      columns={this._columns}
      rowGetter={this.rowGetter}
      rowsCount={this.state.rows.length}
      minHeight={500}
      onGridRowsUpdated={this.handleGridRowsUpdated} />
    <br></br>
    <AddExpense/>
    </div>
  )
  }
}

