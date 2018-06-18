import React, {PropTypes} from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'
import EditableCell from '../../atoms/EditableCell'
import { Icon, Input, Table, Button } from 'antd';

const style = {
  width: '65vw',
  height: '38vh',
}

const style2 = {
  width: '65vw',
  height: '38vh',
  
}

class MapContainer extends React.Component {
  constructor(props){
    super(props)

    this.columns = [
      {title: 'ID', dataIndex: 'id'}, 
      {title: 'Place', dataIndex: 'place',
      render: (text,record) => {
        return (
          <EditableCell
          value={record.place}
          onChange={this.onCellChange(record.id, 'place')}
          updated={this.props.updated}
          />
        );
      }}, 
      {title: 'Move to Marker', dataIndex: 'go',
      render: (text, record) => {
        return (
          <a onClick={() => this.onMoveTo(record.lat,record.lng)}><Button icon="rocket" style={{ fontSize: 16, color: '#08c'}} > Go </Button></a>
        );
      }}
    ];

    let rows = this.createRows(this.props.marker)
    this.state = {
      position : {lat: 37.459263, lng: 126.953131},
      updated : this.props.updated,
      data : rows,
      selectedRowKeys : []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updated) {
      let rows = this.createRows(nextProps.marker)
      this.setState({data:rows})
    }
  }

  createRows = (markers) => {
    let rows = []
    for (let i = 0; i < markers.length; i++){
      let marker = markers[i]
      rows.push({
        key : i.toString(),
        realId : marker.id,
        id : i+1,
        place : marker.place,
        lat : marker.lat,
        lng : marker.lng
      })
    }
    return rows
  }

  onMapClick = (props, map, e) => {
    this.props.onAddMarker(e.latLng.lat(),e.latLng.lng()) 
  }

  onDeleteRow = () => {
    let markers = this.props.marker
    console.log(this.state.selectedRowKeys,"SELECT")
    let markIDs = []
    for (var i=0; i<this.state.selectedRowKeys.length; i++)
      markIDs.push(markers[parseInt(this.state.selectedRowKeys[i])].id)
    this.props.onDelete(markIDs)
    this.setState({selectedRowKeys:[]})
  }
  
  onMoveTo = (lat,lng) => {
    this.setState({position:{lat:lat,lng:lng}})
  }

  onCellChange = (id, dataIndex) => {
    return (value) => {
      const data = [...this.state.data];
      const target = data.find(item => item.id === id);
      if (target) {
        target[dataIndex] = value;
        let updatedRow = {id:target['realId'],place:value}
        this.props.onChangeContent(updatedRow)
      }
    }
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }


  render() {
  const {selectedRowKeys } = this.state
  const rowSelection = {
    selectedRowKeys,
    onChange: this.onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;
  const columns = this.columns;
  const data = this.state.data

    return (
      <div className="vs">
      <div className = "mapvs">
      <h3> Right click to add marker </h3>
      <Map
      google={this.props.google} 
      style={style}
      containerStyle={style2}
      onRightclick={this.onMapClick}
      initialCenter={{lat: 37.459263,
        lng: 126.953131}}
      center={this.state.position}
      zoom={14}>
      {this.state.data.length>0 && this.state.data.map(pos =>
      <Marker key={pos.id} label={pos.id.toString()} position={{lat:pos.lat,lng:pos.lng}}/>
     )}
      </Map>
      </div>
      <div className = "markervs">
      <div >
      <div className="container">
      <div className="eachbutton">
      <Button
        type="primary"
        onClick={this.onDeleteRow}
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
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBsvJf5vB73VjHReadFbUR-Msj9EUZ0fgo" 
})(MapContainer)

