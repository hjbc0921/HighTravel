import React, { PropTypes } from 'react';
import Calendar from 'react-calendar';
 
 
export const ShowSchedule = ({onDay}) =>{
  let state = { date : new Date()}
 
    const onchange = date =>{
     state.date = date
    }
    const onDayClick = date => {
    // onDay(date)
   }
    return (
      <div>
        <Calendar
          onChange={onchange}
          onClickDay={onDayClick}
          value={state.date}
        />
      </div>
    );
}

ShowSchedule.propTypes = {
  state: PropTypes.arrayOf(PropTypes.shape({
             date:PropTypes.string
  })),
  reverse: PropTypes.bool,
}

export default ShowSchedule
