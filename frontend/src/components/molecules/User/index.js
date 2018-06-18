import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import {Link} from 'react-router'
import AddTrip from '../../../containers/Addtrip'
import { Button, Icon } from 'antd'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
  text-align: center;
`

const InnerWrapper = styled.div`
  display: inline-grid;
  margin-top: 20px;
`;

const User = ({tripIdSave }) => {
  var triplist = JSON.parse(sessionStorage.getItem('mytrips'))

  return (
    <Wrapper>
    <InnerWrapper>
      <br></br>
      <h1 className="yourtrip">Start your trip!</h1>
      {triplist!==null && triplist.map(trip =>
      <div key={trip.id}><Link to ="/"> <Button size="large" onClick={ event => tripIdSave(trip.id, trip.title) }><Icon style={{fontSize:18}} type="schedule"/>{trip.title}</Button>
      <br/><br/>
      </Link></div>
      )}
      <br/><br/><br/>
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

