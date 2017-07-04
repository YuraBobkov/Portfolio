import React from "react";


export default class List extends React.Component{
  render(){
    return(
      <li className="list-group-item" >
        {this.props.event.type === 'deadline' ? <p className="text-uppercase" style={{color: '#ff0600'}}>Deadline </p> : null}
        {this.props.event.type === 'event' ? <p className="text-uppercase" style={{color: '#2cab8b'}}>Event </p> : null}
        {this.props.event.type === 'workshop' ? <p className="text-uppercase" style={{color: '#a73c00'}}>Workshop </p> : null}
        {this.props.event.type === 'webinar' ? <p className="text-uppercase" style={{color: '#67cb22'}}>Webinar </p> : null}
        {this.props.event.type === 'lecture' ? <p className="text-uppercase" style={{color: '#0e69ce'}}>Lecture </p> : null}
        <p><span>Title: </span>{this.props.event.title}</p>
        <p><span>Location: </span><a href={`https://www.google.com/maps/search/${this.props.event.location}`} target="_blank">{this.props.event.location}</a></p>
        <p><span>Start: </span>{this.props.event.start.slice(11, 19)}</p>
        <div className="container" style={{display: 'inline'}}>
          <a href={`#${this.props.event.id}`} className="btn btn-default btn-xs" data-toggle="collapse">Speakers</a>
          <div id={`${this.props.event.id}`} className="collapse">
            {this.props.event.speakers.map((speaker, index) =>
              <div  key={`speaker-${index}`}>
                <img src={this.props.trainers[speaker].avatar} alt="foto"/>
                <span>{this.props.trainers[speaker].name}</span>
              </div>
            )}
          </div>
        </div>
        <div className="container" style={{display: 'inline'}}>
          <a href={`#${this.props.event.id}1`} className="btn btn-default btn-xs" data-toggle="collapse">Description</a>
          <div id={`${this.props.event.id}1`} className="collapse">{this.props.event.description}</div>
        </div>
        <div className="container" style={{display: 'inline'}}>
          <a href={`#${this.props.event.id}2`} className="btn btn-default btn-xs" data-toggle="collapse">More</a>
          <div id={`${this.props.event.id}2`} className="collapse">
            <div className="container" style={{display: 'inline'}}>
              {this.props.event.resources.map((resource, index) =>
                <div key={`resource-${index}`}>
                  <a href={`#${resource.type}`} className="btn btn-default btn-xs" data-toggle="collapse" >Resource ({resource.type})</a>
                  <div id={resource.type} className="collapse">
                    <a href={resource.resource} target="_blank" >Go to site</a>
                    <p>{resource.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </li>
    )
  }
}
