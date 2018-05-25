import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css'

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
        <FullCalendar
         header = {{
            left: 'prev,next today myCustomButton',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        }}
         defaultDate={'2017-09-12'}
        navLinks= {true} // can click day/week names to navigate views
        editable= {true}
        eventLimit= {true} // allow "more" link when too many events
        events = {state.events}
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

