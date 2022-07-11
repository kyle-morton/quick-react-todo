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
        
    }

    render() {
        return (
            <div>
                To-Do List
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