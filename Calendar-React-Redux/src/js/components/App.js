import React from 'react'
import { connect } from 'react-redux'
import Calendar from './Calendar'
import EventsList from './Events-list'

class App extends React.Component {
  render () {
    return (
      <div className="container">
        <h2 className="text-center">The Rolling Scopes School Calendar</h2>
        <div className="wrapper">
          <Calendar {...this.props}/>
        </div>
        <div className="col-wrapper">
          <label className="text-center" style={{width: '100%', marginTop: '16px'}}>
            {(new Date(this.props.calendar.selected.year, this.props.calendar.selected.month, this.props.calendar.selected.day)).toGMTString().slice(0, 16)}
          </label>
          <EventsList {...this.props}/>
        </div>

      </div>
    )
  }
}

export default connect(state => {
  return {
    calendar: state.calendar,
    req: state.req,
    trainers: state.trainers
  }
})(App)
