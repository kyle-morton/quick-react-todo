import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class ToDo extends React.Component {

    onDelete(event) {
        this.props.onDelete(event, this.props.todo.id);
        event.preventDefault();
    }

    onComplete(event) { 
        this.props.onComplete(event, this.props.todo.id);
        event.preventDefault();
    }

    render() {
        return (
            <li className={this.props.todo.isComplete ? 'complete' : ''}>
                {this.props.todo.title} 
                <button className="to-do-button" onClick={(e) => this.onDelete(e)}>Delete</button>
                {!this.props.todo.isComplete &&
                    <button className="to-do-button" onClick={(e) => this.onComplete(e)}>Complete</button>
                }
            </li>
        );
    }
}

class CreateForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };
    }

    handleChange(event) {
        this.setState({title: event.target.value});
    }

    submit(event) {
        event.preventDefault();
        this.props.handleCreate(this.state.title);
    }

    render(props) {
        return (
            <form onSubmit={ (e) => this.submit(e)}>
            <label>
              Title:
              <input type="text" value={this.state.title} onChange={(e) => this.handleChange(e)} />
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
            ]
        };
    }

    componentDidMount() {
        this.asyncRequest = this.getToDos().then(
            data => {
                console.log('got a response: ' + data);
                this.asyncRequest = null;
                this.setState({
                    todos: data
                });
            }
        )
    }
    
    async getToDos() {
        const response = await fetch('http://localhost:5176/todo', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            // body: null
        });

        return await response.json();
    }

    async createToDo(title) {
        const response = await fetch(`http://localhost:5176/todo/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ title: title })
          })
        
        var todo = await response.json();
        
        let todoList = this.state.todos.slice();
        todoList.push(todo);
        this.setState({
            todos: todoList
        });
    }

    async deleteToDo(event, id) {
        const response = await fetch(`http://localhost:5176/todo/delete?id=` + id, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 'id': id})
          });

        await response.json();
        
        let todos = this.state.todos.slice().filter(e => {
            if (e.id != id) {
                return e;
            }
        });

        this.setState({
            todos: todos
        })
    }

    async completeToDo(event, id) {
        const response = await fetch(`http://localhost:5176/todo/complete?id=` + id, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 'id': id})
          });

        await response.json();

        let todos = this.state.todos.slice();
        var todo = todos.find(td => {
            if (td.id == id) {
                return td;
            }
        });

        if (!todo) {
            return;
        }

        todo.isComplete = true;

        this.setState({
            todos: todos
        })
    }

    render() {
        return (
            <div>
                <h3>To-Do List</h3>
                <CreateForm handleCreate={(i) => this.createToDo(i)}></CreateForm>
                <ol>
                    { 
                        this.state.todos.map((todo, index) => {
                            return <ToDo key={todo.id} todo={todo} onDelete={this.deleteToDo.bind(this)} onComplete={this.completeToDo.bind(this)}></ToDo>;
                        })
                    }
                </ol>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ToDoList />);