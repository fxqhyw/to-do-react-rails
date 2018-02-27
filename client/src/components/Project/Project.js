import React, { Component } from 'react';

import Tasks from './Tasks/Tasks';
import './Project.css';
import EditProjectForm from './EditProjectForm/EditProjectForm';

class Project extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };
          
        this.handleChange = this.handleChange.bind(this);
        this.submitTaskHandler = this.submitTaskHandler.bind(this);
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.props.onSortEnd({oldIndex, newIndex});
    }

    handleChange = (event) => {
        this.setState({term: event.target.value});
    }

    submitTaskHandler = (event) => {
        const priority =  this.props.tasks.length+1;

        const task = {
            name: this.state.term,
            done: false,
            deadline: null,
            project_id: this.props.projectId,
            priority: priority
        };
        this.props.submitTask(task);
        this.setState({term: ''});
        event.preventDefault();
    }


    deleteProject = () => {
       this.props.deleteProject(this.props.projectId);
    }

    showEditProjectForm = () => {
        this.props.showEditProjectForm(this.props.projectId);
    } 

    editProject = (event) => {
        event.preventDefault();
        const project = {
            id: this.props.projectId,
            name: event.target.value,
        };
        this.props.editProject(project);
    }

    render () {    
        return (
            <div className="todo-list">
                <div className="todo-list__header">                
                    <i className="fas fa-calendar-alt"></i>
                    {this.props.editingProjectId === this.props.projectId ? 
                        <EditProjectForm editProject={this.editProject} value={this.props.name}/>
                        : <h1>{this.props.name}</h1>}
                    <div className="params"><a className="todo-list__header--edit" onClick={this.showEditProjectForm}>
                        <i className="fas fa-pencil-alt"></i></a>
                        <a className="todo-list__header--clear" onClick={this.deleteProject}><i className="fas fa-trash-alt"></i></a>
                    </div>
                </div>
                <div className="todo-list__search"><i className="fas fa-plus"></i>
                    <div className="todo-list__search--params">
                        <form onSubmit={this.submitTaskHandler} >
                            <input type="text" onChange={this.handleChange} value={this.state.term}
                                placeholder="Start typing here to creae a task..."/>
                            <button type="submit" disabled={!this.state.term}><span>Add task</span></button>
                        </form>
                    </div>
                </div>
                <Tasks 
                 projectId={this.props.projectId} 
                 tasks={this.props.tasks}
                 deleteTask={this.props.deleteTask}
                 editTask={this.props.editTask}
                 showEditTaskForm={this.props.showEditTaskForm}
                 editingTaskId={this.props.editingTaskId}
                 onSortEnd={this.onSortEnd}/>              
            </div>
        );
    }    
}

export default Project;