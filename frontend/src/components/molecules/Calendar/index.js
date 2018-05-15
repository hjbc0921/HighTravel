import React, { Component } from 'react';
import Calendar from 'react-calendar';
 
 
export const ShowSchedule = ({onDay}) =>{
    state = { date : new Date()}
 
    const onchange = date =>{
     state.date = date
    }
    const onDayClick => {
     onDay(date)
   }
    return (
      <div>
        <Calendar
          onChange={onChange}
          onClickDay={onDayClick}
          value={state.date}
        />
      </div>
    );
}

ShowSchedule.propTypes = {
  state: PropTypes.arrayof(PropTypes.shape({
             date:PropTypes.string
  })),
  reverse: PropTypes.bool,
}


