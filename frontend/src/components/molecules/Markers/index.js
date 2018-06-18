import React from 'react'
import { Icon, Col, Table, Button } from 'antd';
import EditableCell from '../../atoms/EditableCell'
  
export class Markers extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'ID',
      dataIndex: 'id',
    }, {
      title: 'Place',
      dataIndex: 'contents',
      render: (text, record) => {
        return (
          <EditableCell
            value={record.contents}
            onChange={this.props.changeContent(record.id, record.contents, 'contents')}
            updated={true}
          />
        );
      }
    }, {
      title: 'Move to Marker',
      dataIndex: 'go',
      render: (text, record) => {
        return (
            <Button icon="rocket" style={{ fontSize: 16, color: '#08c'}} onClick={this.onGoClick}> Go </Button>
        );
      },
    }];

  //  var rows = this.createRows(this.props.budget)

    this.state = {
      selectedRowKeys: [], 
      data: this.props.markers,
    };
  }
  onGoClick = () => {
    console.log("CLICKED")
    this.props.onMove()
  }

  deleteBudget = () => {
    let markers = this.props.markers
    let markIDs = []
    for (var i=0; i<this.state.selectedRowKeys.length; i++)
      markIDs.push(markers[this.state.selectedRowKeys[i]-1].id)
    this.props.onDelete(markIDs)
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
          <span style={{ marginLeft: 10 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    );
  }
}

