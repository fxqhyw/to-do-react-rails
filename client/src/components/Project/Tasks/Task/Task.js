import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { SortableHandle } from 'react-sortable-hoc';

import EditTaskForm from './EditTaskForm/EditTaskForm';
import Deadline from './Deadline/Deadline';
import DeadlinePicker from './DeadlinePicker/DeadlinePicker';
import "./Task.css";

class Task extends Component {
    constructor(props) {
        super(props);
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectDeadline = this.handleSelectDeadline.bind(this);
    }

    handleInputChange = (event) => {
        event.preventDefault();

        const done = event.target.checked;
        this.setState({
            done: done
        });
        const task = {
            id: this.props.task.id,
            name: this.props.task.name,
            done: done,
            deadline: this.props.task.deadline,
            project_id: this.props.task.project_id
        };
        this.props.editTask(task);
    }

    handleSelectDeadline = (date) => {
        const year = date._d.getFullYear();
        const month = date._d.getMonth()+1;
        const day = date._d.getDate();
        const formatedDate = year + "-" + month + "-" + day;

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

    delete = () => {
        this.props.deleteTask(this.props.task.id);
    }

    render() {
        let style = {};
        if(this.props.task.done) {
            style = {
                textDecoration: 'line-through'};
        }
        
        const DragHandle = SortableHandle(() => <span><i className="fas fa-arrows-alt-v"></i></span>);

        return(
            <li className="task" >
                <input type="checkbox" 
                    checked={this.props.task.done}
                    onChange={this.handleInputChange} />
                {this.props.editingTaskId === this.props.task.id ? 
                    <EditTaskForm
                    edit={this.edit}
                    name={this.props.task.name}/>  :
                <span className="name" style={style}>{this.props.task.name} {this.props.task.deadline ? <Deadline 
                deadline={this.props.task.deadline}/> : null }</span> }
                    <div className="params">
                        <DragHandle />
                        <div className="datePicker">
                            <DatePicker 
                            customInput={<DeadlinePicker dis={this.props.task.done}/>}
                            onSelect={this.handleSelectDeadline}
                            /> 
                        </div>
                        <span onClick={this.showForm} ><i className="fas fa-pencil-alt" ></i></span>
                        <span className="trash" onClick={this.delete}><i className="fas fa-trash-alt" ></i></span>                    
                    </div>  
            </li>
        );
    }
}

export default Task;
