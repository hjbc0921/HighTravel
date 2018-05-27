import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
const ReactDataGrid = require('react-data-grid');
import AddBudget from '../../../containers/Addbudget'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

export class Budget extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.createRows();
    this._columns = [
      { key: 'id', name: 'ID' },
      { key: 'contents', name: 'Contents', editable:true },
      { key: 'money', name: 'Money', editable:true } ];

    this.state = null;
  }

  createRows = () => {
    let rows = [];
    var total = 0;
    var budgets = this.props.budget
    budgets.map(bud =>
      rows.push({
        id: bud.id,
        contents: bud.contents,
        money: bud.money
      })
    )
    
    rows.push({id:""});
    rows.push({id: 'Total', money: total});

    this._rows = rows;
  };

  rowGetter = (i) => {
    return this._rows[i];
  };

  render() {
    return  (
      <div>
      <ReactDataGrid
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this._rows.length}
        minHeight={200} />
      <br></br>
      <AddBudget/>
      </div>
    );    
  }
}

