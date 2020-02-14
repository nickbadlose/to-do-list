import React from 'react';
import logo from './logo.svg';

export default class AddListItem extends React.Component {
  state = {
    inputItem: '',
    inputDate: ''
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Add task:
          <input
            type="text"
            name="new-list-item"
            value={this.state.inputItem}
            placeholder="task to do"
            onChange={this.handleChange}
          ></input>
          Add due date:
          <input
            type="text"
            name="new-due-date"
            value={this.state.inputDate}
            placeholder="mm-dd-yyyy"
            onChange={this.handleChange}
          ></input>
        </label>
        <button type="submit">Submit Item</button>
      </form>
    );
  }

  handleChange = event => {
    if (event.target.name === 'new-list-item') {
      this.setState({ inputItem: event.target.value });
    } else if (event.target.name === 'new-due-date') {
      if (/[^a-z][^A-Z]/.test(event.target.value.slice)) {
        this.setState({ inputDate: event.target.value });
      }
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addNewItem(this.state.inputItem, this.state.inputDate);
    this.setState({ inputItem: '', inputDate: '' });
  };
}
