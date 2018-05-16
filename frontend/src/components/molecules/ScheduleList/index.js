import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Styledul = styled.ul`
  font-family: ${font('primary')};
`

const Schedule = styled.li`
  font-family: ${font('primary')};
`

const ScheduleList = ({scheduleliststate= [],onScheduleClick }) => {
   scheduleliststate.map(schedule =>{console.log(schedule)})
  return (
    <Styledul>
      {scheduleliststate.map(schedule =>
       <Schedule key={schedule.id} onClick={event =>onScheduleClick(schedule.id)}>{schedule.contents}</Schedule>
    ) }
    </Styledul>
  );
};

ScheduleList.propTypes = {
  scheduleliststate:PropTypes.arrayOf(PropTypes.shape({
  id:PropTypes.number,
  completed:PropTypes.bool,
  contents:PropTypes.string
 })),
 reverse: PropTypes.bool,
}


