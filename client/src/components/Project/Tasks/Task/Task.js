import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { SortableHandle } from 'react-sortable-hoc';

import './Task.css';
import EditTaskForm from './EditTaskForm/EditTaskForm';
import Deadline from './Deadline/Deadline';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
          done: false,
          deadline: null
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectDeadline = this.handleSelectDeadline.bind(this);

      }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.checked
        });
    }

    handleSelectDeadline = (date) => {
        const year = date._d.getFullYear();
        const month = date._d.getMonth()+1;
        const day = date._d.getDate();
        const formatedDate = year + "-" + month + "-" + day;
        this.setState({
            deadline: formatedDate
        });
        console.log(formatedDate);
;        const task = {
            id: this.props.task.id,
            name: this.props.task.name,
            done: this.props.task.done,
            deadline: formatedDate,
            project_id: this.props.task.project_id
        };
        this.props.editTask(task);
    }

    showForm = () => {
        this.props.showEditForm(this.props.task.id);
    }

    edit = (event) => {
        const task = {
            id: this.props.task.id,
            name: event.target.value,
            done: this.props.task.done,
            deadline: this.props.task.deadline,
            project_id: this.props.task.project_id
        };
        this.props.editTask(task);
        event.preventDefault();
    }

    doneIt = (event) => {
        const task = {
            id: this.props.task.id,
            name: this.props.task.name,
            done: event.target.checked,
            deadline: this.props.task.deadline,
            project_id: this.props.task.project_id
        };
        this.props.editTask(task);
    }

    delete = () => {
        this.props.deleteTask(this.props.task.id);
    }

    render() {
        let style = {};
        if(this.props.task.done) {
            style = {
                textDecoration: 'line-through'};
        }
        
        const DragHandle = SortableHandle(() => <span>::</span>);

        return(
            <li style={style} className="Task">
                <input type="checkbox"
                    name="done"
                    checked={this.state.done}
                    onClick={this.doneIt}
                    onChange={this.handleInputChange} />
                {this.props.editingTaskId === this.props.task.id ? 
                    <EditTaskForm
                    edit={this.edit}/> :
                    this.props.task.name}
                <button onClick={this.showForm}>Edit Task</button>
                    {this.props.task.deadline ? <Deadline 
                        deadline={this.props.task.deadline}/> : null}
                <button onClick={this.delete}>Delete Task</button>
                <DragHandle />
                <DatePicker
                    onSelect={this.handleSelectDeadline}
                    />
            </li>
        );
    }
}

export default Task;
