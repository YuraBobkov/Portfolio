import React from "react";
import {calendarNavToday, calendarNavPrev, calendarNavNext, calendarSelectDay} from "../actions/calendar";

export default class Calendar extends React.Component {
  constructor() {
    super();
    this._onToday = this._onToday.bind(this);
    this._onPrevMonth = this._onPrevMonth.bind(this);
    this._onNextMonth = this._onNextMonth.bind(this);
    this._onSelect = this._onSelect.bind(this);
    let now = new Date();
    this.now = {
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate()
    }
  }

  componentDidMount() {
    this.props.dispatch( { type: 'LOAD_DATA' });
  }
  _onSelect(event) {
    event.stopPropagation();
    event.preventDefault();
    let dateStr = event.target.getAttribute("data") || event.target.parentElement.getAttribute("data") || event.target.parentElement.parentElement.getAttribute("data");
    if (!dateStr) return;
    let dateArray = dateStr.split("-");
    this.props.dispatch(calendarSelectDay(dateArray[0], dateArray[1], dateArray[2]));
  }
  _onToday(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.dispatch(calendarNavToday());
  }
  _onPrevMonth(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.dispatch(calendarNavPrev());
  }
  _onNextMonth(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.dispatch(calendarNavNext());
  }
  _makeWeek() {
    let weekArray = [];
    for (let dayOfWeek=0; dayOfWeek <= 6; dayOfWeek++) {
      this.dayOfWeek++;
      let selectedClass =  this.props.calendar.thisMonthSelected && (this.props.calendar.selected.day == this.dayOfWeek) ? " selected" : "";
      let todayClass = this.props.calendar.thisMonthNow && (this.now.day == this.dayOfWeek) ? " today" : "";
      if ((this.dayOfWeek > 0) && (this.dayOfWeek <= this.lastDayOfMonth)) {
        let key = `${this.props.calendar.year}-${this.props.calendar.month}-${this.dayOfWeek}`;

        let eventList;
        if (this.props.req[key] && this.props.req[key].length) {
          eventList = Object.keys(this.props.req[key]).map(event =>
            this.props.req[key][event].type === 'deadline' ? <span key={this.props.req[key][event].id} className="event" style={{color: '#ff0600'}}> {this.props.req[key][event].type} </span> :
              this.props.req[key][event].type === 'event' ? <span key={this.props.req[key][event].id} className="event" style={{color: '#2cab8b'}}> {this.props.req[key][event].type} </span> :
                this.props.req[key][event].type === 'workshop' ? <span key={this.props.req[key][event].id} className="event" style={{color: '#a73c00'}}> {this.props.req[key][event].type} </span> :
                  this.props.req[key][event].type === 'webinar' ? <span key={this.props.req[key][event].id} className="event" style={{color: '#67cb22'}}> {this.props.req[key][event].type} </span> :
                    this.props.req[key][event].type === 'lecture' ? <span key={this.props.req[key][event].id}  className="event" style={{color: '#0e69ce'}}> {this.props.req[key][event].type} </span> : null
          );
        }
        weekArray.push(<div className={`day ${selectedClass} ${todayClass}`}
          key={"day" + this.dayOfWeek}
          data={key}
          onClick={this._onSelect}>
            {this.dayOfWeek}
            <div className="events">
              {eventList}
            </div>
          </div>);
      } else {
        weekArray.push(<div className="day off" key={"day" + this.dayOfWeek}> </div>)
      }
    }
    return weekArray;
  }
  render() {
    let currentFistDay = new Date(this.props.calendar.year, this.props.calendar.month, 1);
    let currentLastDay = new Date(this.props.calendar.year, this.props.calendar.month +1, 0);
    this.dayOfWeek = -currentFistDay.getDay();
    this.lastDayOfMonth = currentLastDay.getDate();
    let monthArray = [];

    let weekCount = 0;
    while (this.dayOfWeek < this.lastDayOfMonth) {
      weekCount++;
      monthArray.push(<div className="week" key={"week" + weekCount}>{this._makeWeek()}</div>);
    }
    let dow = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let nowShowing = new Date(this.props.calendar.year, this.props.calendar.month, 1);
    let options = {year: 'numeric', month: 'long'};
    return (
      <div className="month">

        <div className="month-nav-bar">
          <button className="btn btn-default" onClick={this._onPrevMonth}>
            <span className="glyphicon glyphicon-arrow-left"/>
          </button>
          <label className="month-nav">
            {nowShowing.toLocaleString("en-US", options)}

          </label>
          <div>
            <button className="btn btn-default" onClick={this._onNextMonth}>
              <span className="glyphicon glyphicon-arrow-right"/>
            </button> 
          </div>
        </div>
        {/*<button className="btn btn-default today" onClick={this._onToday}>Today</button>*/}

        <div className="dow-container">
          {dow.map(dayString => <div className="dow" key={dayString}>{dayString}</div>)}
        </div>
        {monthArray}
      </div>
    )
  }
}
