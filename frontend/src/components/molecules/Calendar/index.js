import React, { PropTypes } from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css'

const color = ["#ec4c24","#e9cb44","#71ca0b","#0ec9a0","#0e6fc9","#2a0ec9","#a413dd","#dd13ab"]

export class Calendar extends React.Component{
  constructor(props){
    super(props);
    var event = this.createEvents(this.props.schedule)
    this.state = {events:event}
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.updated){
    var event = this.createEvents(nextProps.schedule)
    this.setState({events:event})
    }
  }

  shouldComponentUpdate(nextProps,nextState){
    return (nextProps.updated ) || (this.props!==nextProps) || (this.state!==nextState) 
  }
  
  createEvents = (schs) => {
    let len = color.length
    let events = []
    if (schs!==null){
      for (var i=0;i<schs.length;i++){
      var sch = schs[i]
      if (sch.sinceWhen===sch.tilWhen){
        events.push({
          title: sch.contents,
          start:sch.sinceWhen,
          allDay:true,
          color: color[i%len]
        })
      }
    else{
      let now = new Date(sch.tilWhen)
      now.setDate(now.getDate()+1)
      events.push({
        title: sch.contents,
        start:sch.sinceWhen,
        end:now,
        allDay:true,
        color: color[i%len]
      })
      }
      }
    }
  return events
  }

  render() {
    const date = (this.state.events.length>0)?this.state.events[this.state.events.length-1].start:new Date();
    return (
      <div id="calendar">
      <FullCalendar
      id = "my_calendar"
      header = {{
      left: 'prev,next today myCustomButton',
      center: 'title',
      right: 'month,basicWeek'
      }}
      defaultDate={date}
      navLinks= {true} // can click day/week names to navigate views
      eventLimit= {true} // allow "more" link when too many events
      events = {this.state.events}	
      />
      </div>
    );
  }
}
