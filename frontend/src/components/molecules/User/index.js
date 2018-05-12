import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
//import TripTitle from '../../../components/atoms/TripTitle'
import Button from '../../../components/atoms/Button'
import {Link} from 'react-router'

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

const User = ({ triplist = [], tripIdSave }) => {

  // routing after TripTitle button is clicked (move to Home page)
  const onTripTitleClick = (tripID) => {
    tripIdSave(tripID)
  }

  return (
    <Wrapper>
      <InnerWrapper>
      <h1>Trip List</h1>
	  {triplist.map(trip =>
      /*
        <TripTitle key={trip.id}
              {...trip}
			  onClick={() => onTripTitleClick(trip.id)}
        />
        */
       <Link to ="/"> <TripTitle key={trip.id} onClick={ event => onTripTitleClick(trip.id) }>{trip.title}</TripTitle>
      </Link>
      )}
	  <br></br><br></br>
      <Link to="/add"> <Button> Add Trip </Button> </Link>
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
