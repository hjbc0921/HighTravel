import React, { PropTypes } from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css'

const color = ["#4bb462","#ff7418","#1890ff","#ff1878","#0d5f32"]

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
      console.log("NaN??",color,len)
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
    return (
      <div id="calendar">
      <FullCalendar
      id = "my_calendar"
      header = {{
      left: 'prev,next today myCustomButton',
      center: 'title',
      right: 'month,basicWeek'
      }}
      navLinks= {true} // can click day/week names to navigate views
      eventLimit= {true} // allow "more" link when too many events
      events = {this.state.events}	
      />
      </div>
    );
  }
}
