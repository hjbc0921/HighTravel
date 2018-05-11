import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import TripTitle from '../../../components/atoms/TripTitle'
import Button from '../../../components/atoms/Button'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
  text-align: center;
`

const InnerWrapper = styled.div`
  display: inline-grid;
  margin-top: 20px;
`;


const User = ({ triplist = [] }) => {
	const onAddTripBtn = () => {
      onAddTrip();
  }
  return (
    <Wrapper>
      <InnerWrapper>
      <h1>Trip List</h1>
	  {triplist.map(trip =>
        <TripTitle key={trip.id}
              {...trip}
			  onClick={() => onTripTitleClick(trip.id)}
        />
      )}
	  <br></br><br></br>
	  <Button type="submit" onClick={onAddTripBtn}>Add Trip</Button>
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
