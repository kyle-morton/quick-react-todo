import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function ToDo(props) {
    return (
        <li>
            {props.title}
        </li>
    );
}

function CreateButton(props) {
    return (
        <button onClick={props.onClick}>
            Add To-Do
        </button>
    );
}

class CreateForm extends React.Component{

    handleChange(event) {
        this.setState({title: event.target.value});
    }

    render(props) {
        return (
            <form onSubmit={this.props.handleCreate}>
            <label>
              Title:
              <input type="text" value={this.state.title} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Add To-Do" />
          </form>
        );
    }
}

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {
                    title: 'ToDo1'
                },
                {
                    title: 'ToDo2'
                }
            ]
        };
    }

    create() {
        let todoList = this.state.todos.slice();
        todoList.push({ title: 'ToDo' + (todoList.length+1) });
        this.setState({
            todos: todoList
        });
    }

    render() {
        return (
            <div>
                <h3>To-Do List</h3>
                <CreateForm handleCreate={(i) => this.create(i)}></CreateForm>
                {/* <CreateButton onClick={(i) => this.create(i)}></CreateButton> */}
                <ol>
                    { 
                        this.state.todos.map(todo => {
                            return <ToDo title={todo.title}></ToDo>;
                        })
                    }
                </ol>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ToDoList />);