import React from 'react';
import logo from './logo.svg';
import './App.css';
import AddListItem from './addListItem';

function List(props) {
  return (
    <ul>
      {props.toDo.map(listItem => {
        return (
          <li key={listItem.name} className={listItem.done}>
            {listItem.name}, Due date: {listItem.dueDate}{' '}
            <input
              type="checkbox"
              onClick={event => props.completeTask(listItem.name)}
              name="taskStatus"
              value="completed"
            />
          </li>
        );
      })}
    </ul>
  );
}

class App extends React.Component {
  state = {
    toDo: [
      {
        name: 'Improve world sustainability',
        dueDate: '01-01-2030',
        done: 'incomplete'
      },
      {
        name: 'finish Northcoders course',
        dueDate: '03-20-2020',
        done: 'incomplete'
      },
      { name: 'Sleep', dueDate: '02-13-2020', done: 'incomplete' }
    ]
  };

  render() {
    return (
      <main>
        <header>Sarah's To Do List</header>
        <label htmlFor="dropdown">Order by: </label>
        <select
          type="dropdown"
          onChange={event => {
            return this.orderBy(event.target.value);
          }}
        >
          <option value="dueDate">Due date</option>
          <option value="done">Still to do</option>
        </select>
        <List toDo={this.state.toDo} completeTask={this.completeTask} />
        <AddListItem addNewItem={this.addNewItem} />
      </main>
    );
  }

  completeTask = completedTaskName => {
    this.setState(currentState => {
      return {
        toDo: currentState.toDo.map(listItem => {
          if (listItem.name === completedTaskName) {
            listItem.done !== 'complete'
              ? (listItem.done = 'complete')
              : (listItem.done = 'incomplete');
          }
          return listItem;
        })
      };
    });
  };

  orderBy = value => {
    if (value === 'dueDate') {
      this.setState({
        toDo: this.state.toDo.sort((currentItem, nextItem) => {
          const currentDate = new Date(currentItem.dueDate).getTime();
          const nextDate = new Date(nextItem.dueDate).getTime();
          return currentDate - nextDate;
        })
      });
    } else if (value === 'done') {
      this.setState({
        toDo: this.state.toDo.sort((currentItem, nextItem) => {
          return currentItem.done < nextItem.done
            ? 1
            : currentItem.done > nextItem.done
            ? -1
            : 0;
        })
      });
    }
  };

  addNewItem = (inputItem, inputDate) => {
    this.setState(currentState => {
      return {
        toDo: [
          ...currentState.toDo,
          { name: inputItem, dueDate: inputDate, done: 'incomplete' }
        ]
      };
    });
  };
}

export default App;
