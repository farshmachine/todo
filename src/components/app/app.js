import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";

import "./app.css";

export default class App extends Component {
  constructor() {
    super();

    this.maxId = 100;

    this.filterButtons = ["All", "Active", "Done"];

    this.state = {
      todoData: [],
      term: "",
      filter: "all", // 'all', 'active', 'done'
    };
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];

      return {
        todoData: newArray,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  toggleProp(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldElement = arr[idx];
    const newElement = { ...oldElement, [propName]: !oldElement[propName] };

    return [...arr.slice(0, idx), newElement, ...arr.slice(idx + 1)];
  }

  toggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProp(todoData, id, "done"),
      };
    });
  };

  toggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProp(todoData, id, "important"),
      };
    });
  };

  search(items, term) {
    return items.filter((el) => {
      if (term.length === 0) {
        return el;
      }

      return el.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.done);
      case "done":
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  filterItemsLabel = (event) => {
    this.setState({
      term: event.target.value,
    });
  };

  filterItems = (name) => {
    this.setState({
      filter: name,
    });
  };

  render() {
    const { todoData, term, filter } = this.state;

    const visibleItems = this.filter(this.search(todoData, term), filter);

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel itemsFilter={this.filterItemsLabel} />
          <ItemStatusFilter
            filterButtons={this.filterButtons}
            filter={filter}
            onFilterChange={this.filterItems}
          />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.toggleImportant}
          onToggleDone={this.toggleDone}
        />
        <ItemAddForm addItem={this.addItem} />
      </div>
    );
  }
}
