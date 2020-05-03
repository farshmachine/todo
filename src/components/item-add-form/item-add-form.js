import React, { Component } from "react";
import "./item-add-form.css";

export default class ItemAddForm extends Component {
  state = {
    label: "",
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.addItem(this.state.label);
    this.setState({
      label: "",
    });
  };

  render() {
    return (
      <form className="item-add-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control search-input"
          placeholder="Enter task name"
          onChange={this.onLabelChange}
          value={this.state.label}
        />
        <button type="button" className="btn btn-outline-secondary">
          Add Task
        </button>
      </form>
    );
  }
}