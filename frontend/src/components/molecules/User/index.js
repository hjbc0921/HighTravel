import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
//import TripTitle from '../../../components/atoms/TripTitle'
import Button from '../../../components/atoms/Button'
import {Link} from 'react-router'
import AddTrip from '../../../containers/Addtrip'

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

const User = ({tripIdSave }) => {
  var triplist = JSON.parse(sessionStorage.getItem('mytrips'))

  return (
    <Wrapper>
    <InnerWrapper>
    <br></br>
      <h1 className="yourtrip">Your Trips</h1>
      {triplist!==null && triplist.map(trip =>
      <div key={trip.id}><Link to ="/"> <TripTitle onClick={ event => tripIdSave(trip.id, trip.title) }>{trip.title}</TripTitle>
      </Link></div>
      )}
      <br></br><br></br>
      <AddTrip/>
    </InnerWrapper>
    </Wrapper>
  );
}

User.propTypes = {
  triplist: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.any.isRequired
  })),
}
export default User
