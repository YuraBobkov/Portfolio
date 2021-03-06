import React, { Component } from 'react';

export default class SearchField extends Component {
  constructor() {
    super();
    this.state = { inputVal: '', selectedRadio: 'name' };
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.getBooks(this.textInput.value, this.state.selectedRadio);
  }
  handleRadioChange = (event) => {
    this.setState({
      selectedRadio: event.currentTarget.value
    })
  };
  
  render() {
    return (
      <div className="searchField">
        <form className="search" onSubmit={this.handleSubmit}>
          <button type="submit" name="search-btn" id="search-btn" value="">
            <i className="fa fa-search fa-2x" aria-hidden="true" />
          </button>
          <input id="stringSearch" type="search" placeholder="Search" ref={(input) => { this.textInput = input; }} />
          <div className="radio">
            <label>
              <input type="radio"
                     id="name"
                     value="name"
                     checked={this.state.selectedRadio === 'name'}
                     onChange={this.handleRadioChange}
              />
              <label htmlFor="name">Book title</label>
            </label>
            <label>
              <input type="radio"
                     id="author"
                     value="author"
                     checked={this.state.selectedRadio === 'author'}
                     onChange={this.handleRadioChange}
              />
              <label htmlFor="author">Author</label>
            </label>
            <label>
              <input type="radio"
                     id="genre"
                     value="genre"
                     checked={this.state.selectedRadio === 'genre'}
                     onChange={this.handleRadioChange}
              />
              <label htmlFor="genre">Genre</label>
            </label>
          </div>
    
        </form>
      </div>
    );
  }
}
