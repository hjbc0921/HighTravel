import React from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import {Link} from 'react-router'
//ANTD
import {Button} from 'antd';
import Icon from 'antd/lib/icon';
import '../../item.css'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
  text-align: center;
`

const InnerWrapper = styled.div`
  display: inline-grid;
  margin-top: 20px;
`;

const TripTitle = styled.button`
  font-family: ${font('primary')};
  color: ${palette( 'grayscale', 0 )};
  background: #dce3ef;
  text-align: center;
  verical-align: middle;
  padding: 5px 10px;
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 2.5px;
  top: 50%;
  trasnform: translateY(-50%);
  border-radius: 20px;
`

export class Triplist extends React.Component{
  render() {
  return (
    <div>
    <h1 className="hightravel">Your Trips</h1>
    {this.props.triplist.map(trip =>
    <div key={trip.id}><Link to ="/"> <TripTitle onClick={ event => this.props.tripIdSave(trip.id, trip.title) }>{trip.title}</TripTitle>
    </Link></div>)}
    </div>
  );
  }
}
