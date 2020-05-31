import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
const Todo = (props) => (
  <tr>
    <td className={props.todo.todo_completed ? 'completed' : ''}>
      {props.todo.todo_description}
    </td>
    <td className={props.todo.todo_completed ? 'completed' : ''}>
      {props.todo.todo_responsible}
    </td>
    <td className={props.todo.todo_completed ? 'completed' : ''}>
      {props.todo.todo_priority}
    </td>
    <td>
      <Link to={'/edit/' + props.todo._id}>Edit</Link>
    </td>
    <td>
      <Link to={'/delete/' + props.todo._id}>Delete</Link>
    </td>
  </tr>
);
export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }
  componentWillMount() {
    console.log('will mpunt');
  }
  componentDidMount() {
    console.log('did mount');
    Axios.get('http://localhost:4000/todos/')
      .then((response) => {
        this.setState({ todos: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentDidUpdate() {
    console.log('did mount');
    Axios.get('http://localhost:4000/todos/')
      .then((response) => {
        this.setState({ todos: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  todoList() {
    return this.state.todos.map(function (currentTodo, i) {
      console.log(i, currentTodo);
      return <Todo todo={currentTodo} />;
    });
  }
  render() {
    console.log('did mount');
    return (
      <div>
        <table className='table table-striped' style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Actions</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}
