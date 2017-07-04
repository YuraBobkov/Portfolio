import React from "react";

import List from './List'

export default class EventsList extends React.Component {

  render() {
    let eventsKey = `${this.props.calendar.selected.year}-${this.props.calendar.selected.month}-${this.props.calendar.selected.day}`;
    let eventsList = this.props.req[eventsKey] || [];
    if (eventsList.length) {
      return (
        <ul className="list-group">{eventsList.map((event, index) =>
          <List event = {event} {...this.props} key={`event-${index}`} />)}
        </ul>
      )
    }
    return null;
  }
}

