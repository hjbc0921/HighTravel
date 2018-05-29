import React, { PropTypes } from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css'

export class Calendar extends React.Component{
  constructor(props){
    super(props);
    var event = this.createEvents(this.props.schedule)
    this.state = {events:event}
  }
  componentWillReceiveProps(nextProps){
    console.log('####################componentWillReceiveProps', this.props,nextProps);
    if (nextProps.updated){
      var event = this.createEvents(nextProps.schedule)
      this.setState({events:event})
    }
  }
  shouldComponentUpdate(nextProps,nextState){
    console.log("#########shouldCOmponent",this.props, nextProps, this.state,nextState)
    return (nextProps.updated ) || (this.props!==nextProps) || (this.state!==nextState) 
  }
  createEvents = (schs) => {
    let events = []
    console.log("createevents",schs)
    if (schs!==null){
    for (var i=0;i<schs.length;i++){
      var sch = schs[i]
      if (sch.sinceWhen===sch.tilWhen){
        events.push({
          title: sch.contents,
          start:sch.sinceWhen
        })
      }
      else{
        events.push({
          title: sch.contents,
          start:sch.sinceWhen,
          end:sch.tilWhen
        })
      }
    }
    }
    console.log(events)
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
	    value = {new Date()}
	    navLinks= {true} // can click day/week names to navigate views
	    editable= {true}
	    eventLimit= {true} // allow "more" link when too many events
      events = {this.state.events}	
	/>
      </div>
    );
  }
}
